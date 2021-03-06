const events = require('./constants')
const path = require('path');
const http = require("http")
const express = require('express')
const { v4: uuid4 } = require('uuid')
const cors = require('cors')
const randomWords = require('random-words');

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
            clients[client]['connection'].send(JSON.stringify(payload))
        }
    })
}

let broadcastAll = (gameId, payload) => {
    games[gameId]['clients'].forEach((client) => {
        clients[client]['connection'].send(JSON.stringify(payload))
    })
}

let sendMessageTo = (clientId, payload) => {
    clients[clientId]['connection'].send(JSON.stringify(payload))
}

const showResults = (gameId) => {
    players = []

    lobbyPlayers = games[gameId]['clients']

    lobbyPlayers.forEach((id) => {
        let name = clients[id].name
        players.push({ 'name': name, 'id': id, 'points': clients[id]['points'] })
    })

    const payload = {
        method: events.END_GAME,
        playerlist: players
    }

    broadcastAll(gameId, payload)

}

let startTurn = (gameId) => {

    games[gameId]['current_player']++;

    // cleart the canvas event at the beginning of the turn
    games[gameId]['canvasEvents'] = []

    const count = games[gameId]['clients'].length

    if (games[gameId]['current_player'] >= count) {
        //
        // clear the  timers
        clearTimeout(games[gameId]['turnTimer'])
        clearTimeout(games[gameId]['gameTimer'])

        games[gameId]['turnTimer'] = null;
        games[gameId]['gameTimer'] = null;

        showResults(gameId)
        return;
    }

    const current_index = games[gameId]['current_player'];
    const clientId = games[gameId]['clients'][current_index]
    const name = clients[clientId]['name']

    const randomWordsList = randomWords(3);
    const payload = {
        'method': events.TURN,
        'words': randomWordsList,
        'turnTime':games[gameId]['turnTime'],
        'gameTime':games[gameId]['gameTime']
    }

    sendMessageTo(clientId, payload)

    let othersPayload = {
        'method': events.WAIT,
        'name': name,
        'time':games[gameId]['turnTime']
    }

    broadcastExceptSelf(clientId, gameId, othersPayload);

    games[gameId]['turnTimer'] = setTimeout(() => {
        startTurn(gameId)
    }, games[gameId]['turnTime']*1000)

}

let startGameSession = (gameId) => {
    const currGameId = gameId
    games[currGameId]['gameTimer'] = setTimeout(() => {
        startTurn(currGameId)
    }, games[currGameId]['gameTime']*1000)
}


wsServer.on('request', req => {

    const connection = req.accept(null, req.origin)
    const clientId = generateId()
    connection.clientId = clientId

    // first creation of client
    clients[clientId] = {}
    clients[clientId]['connection'] = connection

    payLoad = {
        "method": events.CONNECT,
        "clientId": clientId
    }
    connection.send(JSON.stringify(payLoad))
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
                clientId = body.clientId
                name = body.name
                gameId = body.gameId

                clients[clientId]['points'] = 0;
                clients[clientId]['name'] = name;
                clients[clientId]['gameId'] = gameId

                prevClientsPayload = {
                    'method': events.PREV_CLIENTS,
                    'clients': games[gameId]['clients']
                }
                sendMessageTo(clientId, prevClientsPayload)
                games[gameId]['clients'].push(clientId)

                players = []

                lobbyPlayers = games[gameId]['clients']

                lobbyPlayers.forEach((id) => {
                    let name = clients[id].name
                    players.push({ 'name': name, 'id': id, 'points': 0 })
                })

                payload = {
                    'method': events.UPDATE_PLAYER_LIST,
                    'playerlist': players
                }

                // // if game already started
                // if (games[gameId]['current_player'] != -1) {

                //     // TODO
                //     // need to keep track  len at this point there may be other events get filled
                //     // when broadcasting send canvas from that index
                //     // const size = games[gameId]['canvasEvents'].length;


                // }

                if (games[gameId]['canvasEvents'].length != 0) {
                    const canvasPayload = {
                        'method': events.DRAW_LINES,
                        'lines': games[gameId]['canvasEvents']
                    }
                    sendMessageTo(clientId, canvasPayload);
                }

                broadcastAll(gameId, payload)
                break;

            case events.START_GAME:

                gameId = body.gameId
                
                // pick current player
                games[gameId]['current_player'] = -1;
                games[gameId]['gameTimer'] = null
                games[gameId]['turnTimer'] = null

                if('gameTimer' in body && 'turnTimer' in body)
                {
                    games[gameId]['gameTime'] = body.gameTimer
                    games[gameId]['turnTime'] = body.turnTimer
                }
                else
                {
                    // restart 

                    games[gameId]['clients'].forEach((client) => {
                        clients[client]['points'] = 0;
                    })

                    payload = {
                        'method':events.RESET
                    }
                    
                    broadcastAll(gameId,payload);
      
                }

                // only admin
                startTurn(gameId)

                break;

            case events.DRAW:

                gameId = body.gameId
                clientId = body.clientId
                let canvasEvent = body.canvasEvent

                // add canvas event to the list

                // in case of clear the also we need to clean the canvasevents array

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

                games[gameId]['canvasEvents'].push(cords)

                payLoad = {
                    'method': events.CORDS,
                    'cords': cords
                }

                broadcastExceptSelf(clientId, gameId, payLoad)
                break;

            case events.GUESS:
                gameId = body.gameId
                clientId = body.clientId
                let guessWord = body.guessWord
                name = body.name

                // get the current game player
                let currentPlayer = games[gameId]['current_player']
                let currentPlayerId = games[gameId]['clients'][currentPlayer]

                //validation
                let match = false

                //  Note: set the gameTimer to null when the gamesessions ends
                if (games[gameId]['gameTimer'] != null && guessWord == games[gameId]['currWord']) {
                    match = true

                    const gotPoints = clients[clientId]['reward']
                    let points = 0;

                    // add points only he has not got it before
                    if (gotPoints == false && clientId != currentPlayerId) {

                        clients[clientId]['points'] += 1
                        clients[clientId]['reward'] = true
                        points = clients[clientId]['points']
                    }

                    payload = {
                        'method': events.GUESS,
                        'clientId': clientId,
                        'name': name,
                        'points': points
                    }

                    // if every body gueses the clear the game timer 

                }
                else {
                    payload = {
                        'method': events.GUESS,
                        'guessWord': guessWord,
                        'clientId': clientId,
                        'name': name,
                        'points': 0
                    }
                }

                broadcastAll(gameId, payload)

                break;

            case 'choice':

                gameId = body.gameId

                // set the reward to false for the players in the game
                games[gameId]['clients'].forEach((id) => {
                    clients[id]['reward'] = false
                })

                clearTimeout(games[gameId]['turnTimer'])
                games[gameId]['turnTimer'] = null;
                clientId = body.clientId
                let word = body.word
                games[gameId]['currWord'] = word

                hint = "_ ".repeat(word.length)

                payload = {
                    'method': events.WORD_SELECT,
                    'hint': hint,
                    'time':games[gameId]['gameTime']
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

    games[gameId] = {}
    games[gameId]['clients'] = []

    games[gameId]['currWord'] = ''
    games[gameId]['canvasEvents'] = []

});

app.get("/isValidGame", (req, res) => {
    let payload = {
        'valid': false,
        'isAdmin': true
    }
    
    if (!req || !req.headers || !req.headers.gameid) {
        return res.send(JSON.stringify(payload))
    }
    
    let gameId = req.headers.gameid
    if (gameId in games) {
        payload = {
            'valid': true
        }
    }
    
    return res.send(JSON.stringify(payload))
})

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 9091;

httpServer.listen(port, () => console.log("Listening.. on ", port))

