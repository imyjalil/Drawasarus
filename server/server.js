
const websocketServer = require("websocket").server

  
const http = require("http");
const httpServer = http.createServer();
httpServer.listen(9090, () => console.log("Listening.. on 9090"))


const wsServer = new websocketServer(
    {
    "httpServer": httpServer
    }
)

wsServer.on('request', req => {
  
    // ??
    const connection = req.accept(null,req.origin)

    connection.on('open',() => console.log("open "))
    connection.on('close', () => console.log("closed! "))

    connection.on("message",message => {
        console.log(message)
        connection.send('hi')
    })

})