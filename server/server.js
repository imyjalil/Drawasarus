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


wsServer.on('request', req => {
  
    // ??
    const connection = req.accept(null,req.origin)



    connection.on('open',() => console.log("connect"))
    connection.on('close', () => console.log("closed! "))

    connection.on("message",message => {

        const body = JSON.parse(message.utf8Data)

        let payLoad = {}
        
        
        switch(body.method)
        {
            case event.CREATE:
                
            console.log("CREATE")
            
            const gameId = generateId();
            const clientId  = body.clientId
            const name = body.name;

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
                'method':event.CREATE,
                'game':gameId
            }

            connection.send(JSON.stringify(payLoad))

                break;

            case event.JOIN:

                const gameId = body.gameId
                const clientId  = body.clientId
            
                payload = {
                    'method': event.JOIN,
                    'name' : clients[clientId]['name']
                }

                broadCast(clientId,gameId,payload)

                console.log("JOIN")

                break;

            case event.DRAW:

                const gameId = body.gameId
                const clientId  = body.clientId
                const canvas = body.canvas

                game[gameId]['canvasEvents'].push(canvas)

                console.log("DRAW")

                broadCast(clientId,gameId,payload)

                break;

            case event.GUESS: 

                const gameId = body.gameId
                const clientId  = body.clientId
                const guessWord =  body.guessWord

                let match = false

                if(guessWord ==  games[gameId]['currWord'])
                {
                    match = true
                }

                payload = {
                    'word':guessWord,
                    'isCorrect':true
                }
                
                broadeCast(clientId,gameId,payload)

                console.log("GUESS")

                break;
            
            case event.WORD_SELECT:
                
                const gameId = body.gameId
                const clientId  = body.clientId
                const word = body.word 
                games[gameId]['currWord'] = word

                hint =  "_".repeat(len(word))

                payload = {
                    'method':'wordselect',
                    'hint':hint
                }

                broadeCast(clientId,gameId,payload)

            case 
        }

        // connection.send(JSON.stringify(payLoad))

    })




    const clientId = generateId()

    // first creation of client
    clients[clientId] = {}

    clients[clientId]['connection'] = connection
 

    const payLoad = {
        "method": "connect",
        "clientId": clientId
    }

    connection.send(JSON.stringify(payLoad))

})