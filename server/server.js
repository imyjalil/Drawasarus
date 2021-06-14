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

        const result = JSON.parse(message.utf8Data)

        let payLoad = {}
        
        
        switch(result.method)
        {
            case event.CREATE:
                
            console.log("CREATE")
            
            const gameId = generateId();
           

            // games[gameId] = []
            // games[gameId].push(userId)

              /*
              {
                  game_id: int
                  user_id: int
              }
              */
                break;

            case event.JOIN:

                console.log("JOIN")

                break;

            case event.DRAW:

                console.log("DRAW")

                break;

            case event.GUESS:

                console.log("GUESS")

                break;
        }

        // connection.send(JSON.stringify(payLoad))

    })




    const clientId = generateId()

    clients[clientId] = {
        'connection':connection
    }

    const payLoad = {
        "method": "connect",
        "clientId": clientId
    }

    connection.send(JSON.stringify(payLoad))

})