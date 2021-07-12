import { ADD_PLAYER, SET_REMOTE_CORDS, REMOVE_PLAYER, SET_LOCAL_STREAM, SET_REMOTE_STREAM, UPDATE_PLAYER_LIST } from "../../utilities/constants"




const intialState = {
    players: [],
    localStream: null,
    remoteCords: [0, 0, 0, 0],
    receivedDrawEvent: false
}

export default function gameReducer(state = intialState, action) {

    //console.log("In game reducer", action)

    switch (action.type) {
        case UPDATE_PLAYER_LIST:
            return {
                ...state,
                players: action.payload.playerlist
            }
        case REMOVE_PLAYER:
            return {
                ...state,
                players: state.players.filter(player => player.id != action.payload.id)
            }
        case SET_REMOTE_CORDS:
            return {
                ...state,
                remoteCords: action.payload.cords,
                receivedDrawEvent: !state.receivedDrawEvent
            }
        case SET_LOCAL_STREAM:
            return {
                ...state,
                localStream: action.payload.stream
            }
        case SET_REMOTE_STREAM:
            var modifiedPlayers = JSON.parse(JSON.stringify(state.players))
            console.log('setremotestream game reducer')
            console.log(modifiedPlayers)
            modifiedPlayers.forEach((player) => {
                if (player.id == action.payload.id) {
                    player.remoteStream = action.payload.stream
                }
            })
            return {
                ...state,
                players: modifiedPlayers
            }
        default:
            return state;
    }

}