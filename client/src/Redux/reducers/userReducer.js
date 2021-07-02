import { CLIENT_CREATE, CLIENT_ID, GAME_ID, NAME, SOCKET, GAME_CREATE, GUESS } from "../../utilities/constants";

const initalState = {
    gameId: '',
    name: '',
    clientId: '',
    isClientCreated: false,
    isGameCreated: false,
    chatEvent: null
}



export default function userReducer(state = initalState, action) {
    console.log("In user reducer", action.type)

    switch (action.type) {


        case SOCKET:
            console.log("update socket", action)
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

        case CLIENT_CREATE:
            return {
                ...state,
                isClientCreated: action.payload['isClientCreated']
            }

        case GAME_CREATE:
            return {
                ...state,
                isGameCreated: action.payload['isGameCreated']
            }

        case GUESS:
            console.log('in guess reducer')
            console.log(action)
            return {
                ...state,
                chatEvent: action.payload['chatEvent']
            }

        default:
            return state
    }
}