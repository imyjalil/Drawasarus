import { ADD_PLAYER, REMOVE_PLAYER, SET_LOCAL_STREAM, UPDATE_PLAYER_LIST } from "../../utilities/constants"




const intialState = {
    players: [],
    localStream: null,
}

export default function gameReducer(state = intialState, action) {

    console.log("In game reducer", action)

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
        case SET_LOCAL_STREAM:
            return {
                ...state,
                localStream: action.payload.stream
            }
        default:
            return state;
    }

}