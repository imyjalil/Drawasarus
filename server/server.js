const events = require('./constants')

const http = require("http");
const httpServer = http.createServer();
httpServer.listen(9090, () => console.log("Listening.. on 9090"))

const websocketServer = require("websocket").server
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

let broadcastExceptSelf = (clientId, gameId, payload) => {

    games[gameId]['clients'].forEach((client) => {
        if (client !== clientId) {
            console.log("-----------------", clients[client]['name'])
            console.log(payload)
            clients[client]['connection'].send(JSON.stringify(payload))
        }
    })
}

let broadcastAll = (clientId, gameId, payload) => {
    games[gameId]['clients'].forEach((client) => {
        clients[client]['connection'].send(JSON.stringify(payload))
    })
}

wsServer.on('request', req => {

    const connection = req.accept(null, req.origin)

    connection.on('open', () => console.log("connect"))
    connection.on('close', () => console.log("closed! "))
    connection.on("message", message => {
        console.log('message received ')
        const body = JSON.parse(message.utf8Data)
        let payLoad = {}
        let gameId, name, clientId;

        switch (body.method) {

            case events.CREATE_GAME:

                console.log("CREATE")
                console.log(body)
                gameId = generateId();
                clientId = body.clientId
                name = body.name;

                clients[clientId]['name'] = name;
                clients[clientId]['gameId'] = gameId

                // first creation of the game
                // initialze the dict
                games[gameId] = {}
                games[gameId]['clients'] = []

                games[gameId]['currWord'] = ''
                games[gameId]['canvasEvents'] = []

                payLoad = {
                    'method': events.CREATE_GAME,
                    'gameId': gameId
                }
                connection.send(JSON.stringify(payLoad))
                break;

            case events.JOIN_GAME:
                console.log("JOIN")

                clientId = body.clientId
                name = body.name
                gameId = body.gameId

                clients[clientId]['name'] = name;
                clients[clientId]['gameId'] = gameId

                games[gameId]['clients'].push(clientId)

                payload = {
                    'method': events.JOIN_GAME,
                    'name': clients[clientId]['name']
                }
                broadcastExceptSelf(clientId, gameId, payload)
                break;

            case events.DRAW:
                console.log('DRAW')
                gameId = body.gameId
                clientId = body.clientId
                let canvasEvent = body.canvasEvent

                console.log(canvasEvent)

                // game[gameId]['canvasEvents'].push(canvasEvent)

                payload = {
                    'method': events.DRAW,
                    'canvasEvent': canvasEvent
                }



                broadcastExceptSelf(clientId, gameId, payload)

                break;

            case events.GUESS:
                console.log('GUESS')
                gameId = body.gameId
                clientId = body.clientId
                let guessWord = body.guessWord
                name = body.name

                //validation
                // let match = false
                // console.log(games)
                // if (guessWord == games[gameId]['currWord']) {
                //     match = true
                // }

                payload = {
                    'method': events.GUESS,
                    'word': guessWord,
                    'clientId': clientId,
                    'name': name
                }

                broadcastAll(clientId, gameId, payload)


                break;

            case events.WORD_SELECT:

                gameId = body.gameId
                clientId = body.clientId
                let word = body.word
                games[gameId]['currWord'] = word

                hint = "_".repeat(len(word))

                payload = {
                    'method': 'wordselect',
                    'hint': hint
                }

                broadcastExceptSelf(clientId, gameId, payload)
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