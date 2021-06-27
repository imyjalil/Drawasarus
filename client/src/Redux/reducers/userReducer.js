import { CLIENT_ID, GAME_ID, NAME, SOCKET } from "../../utilities/constants";



const initalState = {
    ws: null,
    gameId: '',
    name: '',
    clientId: ''
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

        default:
            return state
    }
}