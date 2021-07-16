const events = require('./constants')
const path = require('path');
const http = require("http")
const express = require('express')
const { v4: uuid4 } = require('uuid')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'build')));
const httpServer = http.createServer(app)

const websocketServer = require("websocket").server;
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

let broadcastAll = (gameId, payload) => {
    console.log("about to broadcast")
    games[gameId]['clients'].forEach((client) => {
        console.log(client)
        clients[client]['connection'].send(JSON.stringify(payload))
    })
}

let sendMessageTo = (clientId, payload) => {
    clients[clientId]['connection'].send(JSON.stringify(payload))
}

const showResults = (gameId)  =>{
    players = []

    lobbyPlayers = games[gameId]['clients']

    console.log("end game")

    lobbyPlayers.forEach((id) => {
        let name = clients[id].name
        players.push({ 'name': name, 'id': id, 'points': 0 })
    })

    const  payload = {
        method:events.END_GAME,
        playerlist:players
    }

    broadcastAll(gameId,payload)

    // clear the  timers
    clearTimeout(games[gameId]['turnTimer'])
    clearTimeout(games[gameId]['gameTimer'])

    games[gameId]['turnTimer'] = null;
    games[gameId]['gameTimer'] = null;

}

let startTurn = (gameId) => {

    console.log(games[gameId]['current_player'])

    games[gameId]['current_player']++;


    const count = games[gameId]['clients'].length

    if(games[gameId]['current_player'] >= count)
    {
        //
        showResults(gameId)
        return;
    }


    const current_index = games[gameId]['current_player'];
    console.log('current_index:', current_index)
    const clientId = games[gameId]['clients'][current_index]
    console.log('clientId:', clientId)
    const name = clients[clientId]['name']
    console.log('name:', name)





    const payload = {
        'method': 'TURN',
        'words': ['abc', 'def', 'fgh']
    }

    sendMessageTo(clientId, payload)


    let othersPayload = {
        'method': 'WAIT',
        'name': name
    }

    broadcastExceptSelf(clientId, gameId, othersPayload);


    games[gameId]['turnTimer'] = setTimeout(() => {
        startTurn(gameId)
    }, 10000)

}

let startGameSession = (gameId) => {


    game[gameId]['gameTimer'] = setTimeout((gameId) => {

        endGameSession()

        startGameSession(gameId)
    }
        , 60000)

}


wsServer.on('request', req => {



    const connection = req.accept(null, req.origin)

    const clientId = generateId()
    connection.clientId = clientId

    // first creation of client
    clients[clientId] = {}
    clients[clientId]['connection'] = connection

    payLoad = {
        "method": "connect",
        "clientId": clientId
    }
    connection.send(JSON.stringify(payLoad))
    // console.log("--->", connection)
    connection.on('open', () => console.log("connect"))
    connection.on('close', () => {
        let gameId = clients[connection.clientId]['gameId']
        payload = {
            'method': events.REMOVE_PLAYER,
            'id': clientId
        }
        broadcastAll(gameId, payload)
        games[gameId]['clients'] = games[gameId]['clients'].filter((id) => { return id != connection.clientId })
    }
    )
    connection.on("message", message => {
        //console.log('message received ')
        const body = JSON.parse(message.utf8Data)
        let payLoad = {}
        let gameId, name, clientId;

        switch (body.method) {

            case events.JOIN_GAME:

                console.log("JOIN")

                clientId = body.clientId
                name = body.name
                gameId = body.gameId

                clients[clientId]['name'] = name;
                clients[clientId]['gameId'] = gameId

                console.log("adding the ", clientId, "to game ", gameId)

                prevClientsPayload = {
                    'method': 'prevClients',
                    'clients': games[gameId]['clients']
                }
                sendMessageTo(clientId, prevClientsPayload)
                games[gameId]['clients'].push(clientId)
                console.log(games)


                // payload = {
                //     'method': events.JOIN_GAME,
                //     'name': clients[clientId]['name']
                // }

                players = []

                lobbyPlayers = games[gameId]['clients']

                console.log(lobbyPlayers)

                lobbyPlayers.forEach((id) => {
                    let name = clients[id].name
                    players.push({ 'name': name, 'id': id, 'points': 0 })
                })

                payload = {
                    'method': events.UPDATE_PLAYER_LIST,
                    'playerlist': players
                }

                console.log("payload", players)

                broadcastAll(gameId, payload)
                break;


            case events.START_GAME:

                gameId = body.gameId

                // pick current player
                games[gameId]['current_player'] = -1;
                games[gameId]['gameTimer'] = null
                games[gameId]['turnTimer'] = null


                // only admin
                startTurn(gameId)

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

            case events.CORDS:

                gameId = body.gameId
                clientId = body.clientId
                let cords = body.cords

                console.log(cords)

                payLoad = {
                    'method': events.CORDS,
                    'cords': cords
                }

                broadcastExceptSelf(clientId, gameId, payLoad)


                break;



            case events.GUESS:

                console.log('GUESS')
                gameId = body.gameId
                clientId = body.clientId
                let guessWord = body.guessWord
                name = body.name

                //validation
                let match = false
                console.log(games)


                //  Note: set the gameTimer to null when the gamesessions ends
                if (games[gameId]['gameTimer'] != null && guessWord == games[gameId]['currWord']) {
                    match = true

                    // client points calculation


                    payload = {
                        'method': events.GUESS,
                        'clientId': clientId,
                        'name': name,
                        'points': 1
                    }

                    // if every body gueses the clear the game timer 

                }
                else {

                    payload = {
                        'method': events.GUESS,
                        'guessWord': guessWord,
                        'clientId': clientId,
                        'name': name
                    }

                }

                broadcastAll(gameId, payload)


                break;
            case events.WORD_SELECT:

                gameId = body.gameId
                clearTimeout(game[gameId]['turnTimer'])
                game[gameId]['turnTimer'] = null;

                clientId = body.clientId
                let word = body.word
                games[gameId]['currWord'] = word


                hint = "_".repeat(len(word))

                payload = {
                    'method': 'wordselect',
                    'hint': hint
                }

                broadcastExceptSelf(clientId, gameId, payload)

                startGameSession(gameId);

                break
            case 'webRTCOffer':
                sendMessageTo(body.receiverId, body)
                break

            case 'webRTCAnswer':
                sendMessageTo(body.receiverId, body)
                break

            case 'sendIceCandidate':
                sendMessageTo(body.receiverId, body)
                break
        }

    })



})


app.post("/create-game", (req, res) => {

    const gameId = uuid4()

    payload = {
        'gameId': gameId
    }
    res.send(payload)
    console.log("creating a game with code", gameId)

    games[gameId] = {}
    games[gameId]['clients'] = []

    games[gameId]['currWord'] = ''
    games[gameId]['canvasEvents'] = []


});

app.get("/isValidGame", (req, res) => {
    console.log(req.headers.gameid)
    console.log(req.params)
    let payload = {
        'valid': false,
        'isAdmin': true
    }
    console.log('abc')
    if (!req || !req.headers || !req.headers.gameid) {
        return res.send(JSON.stringify(payload))
    }
    console.log('def')
    let gameId = req.headers.gameid
    if (gameId in games) {
        payload = {
            'valid': true
        }
    }
    console.log('ghi')
    return res.send(JSON.stringify(payload))
})

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

httpServer.listen(9091, () => console.log("Listening.. on 9091"))

