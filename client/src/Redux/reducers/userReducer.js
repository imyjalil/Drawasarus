const constants = require("../../utilities/constants")

const initalState = {
    gameId: null,
    name: '',
    clientId: '',
    chatEvent: null,
    isCreator: false
}

export default function userReducer(state = initalState, action) {

    switch (action.type) {


        case constants.SOCKET:
            return {
                ...state,
                ws: action.payload['ws']
            }

        case constants.GAME_ID:
            return {
                ...state,
                gameId: action.payload['gameId']
            }

        case 'clientId':
            return {
                ...state,
                clientId: action.payload['clientId']
            }

        case constants.NAME:
            return {
                ...state,
                name: action.payload['name']
            }

        case constants.GUESS:
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