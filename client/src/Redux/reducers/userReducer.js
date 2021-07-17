import { CLIENT_ID, GAME_ID, NAME, SOCKET, GUESS } from "../../utilities/constants";

const initalState = {
    gameId: null,
    name: '',
    clientId: '',
    chatEvent: null,
    isCreator: false
}

export default function userReducer(state = initalState, action) {

    switch (action.type) {


        case SOCKET:
            return {
                ...state,
                ws: action.payload['ws']
            }

        case GAME_ID:
            return {
                ...state,
                gameId: action.payload['gameId']
            }

        case CLIENT_ID:
            return {
                ...state,
                clientId: action.payload['clientId']
            }

        case NAME:
            return {
                ...state,
                name: action.payload['name']
            }

        case GUESS:
            console.log(action)
            return {
                ...state,
                chatEvent: action.payload['chatEvent']
            }

        case 'set_create':
            return {
                ...state,
                isCreator: true
            }

        default:
            return state
    }
}