const event = require('./constants')

const websocketServer = require("websocket").server


const http = require("http");
const httpServer = http.createServer();
httpServer.listen(9090, () => console.log("Listening.. on 9090"))


const wsServer = new websocketServer(
    {
        "httpServer": httpServer
    }
)

id = 0;

games = {}
clients = {}



function generateId() {
    return ++id;
}

broadCast = (clientId, gameId, payload) => {
    games[gameId][clients].forEach((client) => {
        if (client !== clientId) {
            clients[client]['connection'].send(JSON.stringify(payload))
        }
    })
}

wsServer.on('request', req => {

    // ??
    const connection = req.accept(null, req.origin)



    connection.on('open', () => console.log("connect"))
    connection.on('close', () => console.log("closed! "))

    connection.on("message", message => {

        const body = JSON.parse(message.utf8Data)

        let payLoad = {}


        switch (body.method) {

            case event.CREATE_GAME:

                console.log("CREATE")

                let gameId = generateId();
                clientId = body.clientId
                let name = body.name;

                clients[clientId]['name'] = name;
                clients[clientId]['gameId'] = gameId

                // first creation of the game
                // initialze the dict
                games[gameId] = {}
                games[gameId]['clients'] = []


                games[gameId]['clients'].push(clientId)
                games[gameId]['currWord'] = ''
                games[gameId]['canvasEvents'] = []

                payLoad = {
                    'method': event.CREATE,
                    'game': gameId
                }

                connection.send(JSON.stringify(payLoad))

                break;

            case event.JOIN_GAME:

                gameId = body.gameId
                clientId = body.clientId

                payload = {
                    'method': event.JOIN,
                    'name': clients[clientId]['name']
                }

                broadCast(clientId, gameId, payload)

                console.log("JOIN")

                break;

            case event.DRAW:

                gameId = body.gameId
                clientId = body.clientId
                let canvasEvent = body.canvasEvent

                game[gameId]['canvasEvents'].push(canvasEvent)

                console.log("DRAW")
                payload = {
                    'method': event.DRAW,
                    'canvasEvent': canvasEvent
                }

                broadCast(clientId, gameId, payload)

                break;

            case event.GUESS:

                gameId = body.gameId
                clientId = body.clientId
                let guessWord = body.guessWord

                let match = false

                if (guessWord == games[gameId]['currWord']) {
                    match = true
                }

                payload = {
                    'method': event.GUESS,
                    'word': guessWord,
                    'isCorrect': true
                }

                broadeCast(clientId, gameId, payload)

                console.log("GUESS")

                break;

            case event.WORD_SELECT:

                gameId = body.gameId
                clientId = body.clientId
                let word = body.word
                games[gameId]['currWord'] = word

                hint = "_".repeat(len(word))

                payload = {
                    'method': 'wordselect',
                    'hint': hint
                }

                broadeCast(clientId, gameId, payload)

        }



    })
    const clientId = generateId()

    // first creation of client
    clients[clientId] = {}
    clients[clientId]['connection'] = connection

    payLoad = {
        "method": "connect",
        "clientId": clientId
    }
    connection.send(JSON.stringify(payLoad))





})