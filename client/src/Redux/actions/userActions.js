import { CLIENT_ID, CONNECT, CREATE_GAME, GAME_ID, JOIN, NAME, SOCKET } from '../../utilities/constants';



export const createGame = () => {
    return {
        type: CREATE_GAME
    }
}

export const joinGame = () => {
    return {
        type: JOIN
    }
}
export const connect = () => {
    return {
        type: CONNECT
    }
}

export const createSocket = (ws) => {
    return {
        type: SOCKET,
        payload: {
            'ws': ws
        }
    }
}

export const storeClientId = (clientId) => {
    return {
        type: CLIENT_ID,
        payload: {
            'clientId': clientId
        }
    }
}

export const storeGameId = (gameId) => {
    return {
        type: GAME_ID,
        payload: {
            'gameId': gameId
        }
    }
}

export const storeName = (name) => {
    return {
        type: NAME,
        payload: {
            'name':name
        }
    }
}