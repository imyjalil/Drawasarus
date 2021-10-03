const constants = require("../../utilities/constants")

const intialState = {
    players: [],
    localStream: null,
    remoteCords: [0, 0, 0, 0],
    receivedDrawEvent: false,
    image: null,
    choice: null,
    selector: null,
    hint: null,
    gameTime:0,
    turnTime:0,
    playerlist: null,//will be populated on end_game event
    resetGame:false
}

export default function gameReducer(state = intialState, action) {

    switch (action.type) {

        case constants.UPDATE_PLAYER_LIST:
            return {
                ...state,
                players: action.payload.playerlist
            }

        case constants.UPDATE_POINTS:
            return {
                ...state,
                players: state.players.map(player => {

                    if (player.id == action.payload.id) {
                        player.points++;
                    }

                    return player
                })
            }
        
        case 'RESET_GAME':
            return{
                ...state,
                players: state.players.map(player => {
                    if(action.payload.val == true)
                    {
                        player.points = 0;
                    }
                    return player
                }),
                resetGame:action.payload.val
            }

        case constants.REMOVE_PLAYER:
            return {
                ...state,
                players: state.players.filter(player => player.id != action.payload.id)
            }

        case constants.DRAW:
            return {
                ...state,
                image: action.payload.image
            }

        case constants.SET_REMOTE_CORDS:
            return {
                ...state,
                remoteCords: action.payload.cords,
                receivedDrawEvent: !state.receivedDrawEvent
            }

        case constants.SET_LOCAL_STREAM:
            return {
                ...state,
                localStream: action.payload.stream
            }

        case constants.SET_REMOTE_STREAM:
            var modifiedPlayers = JSON.parse(JSON.stringify(state.players))
            modifiedPlayers.forEach((player) => {
                if (player.id == action.payload.id) {
                    player.remoteStream = action.payload.stream
                }
            })
            return {
                ...state,
                players: modifiedPlayers
            }

        case 'CHOICE':
            return {
                ...state,
                choice: action.payload.words,
                turnTime: action.payload.turnTime,
                gameTime: action.payload.gameTime
            }

        case 'SELECTOR':
            if("time" in action.payload)
            {
                return {
                    ...state,
                    selector: action.payload.name,
                    turnTime: action.payload.time
                }
            }
            return {
                ...state,
                selector:action.payload.name
            }

        case 'HINT':
            return {
                ...state,
                hint: JSON.parse(JSON.stringify(action.payload.hint)),
                gameTime:action.payload.time
            }

        case 'end_game':
            return {
                ...state,
                playerlist: action.payload.playerlist
            }

        default:
            return state;
    }
}