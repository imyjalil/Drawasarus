import { CLIENT_ID, CONNECT, GAME_ID, JOIN_GAME, NAME, SOCKET, } from '../../utilities/constants';
import axios from 'axios'


export const createGame = (roomName) => (dispatch) => {
    return axios.post("http://localhost:9091/create-game")
        .then(response => {
            console.log(response.data)
            response = response.data
            dispatch(storeGameId(response.gameId))
            return `game/${response.gameId}`
        })
        .catch(error => {
            return ''
            // need to dispatch game create failed action
        })

}





export const joinGame = () => {
    return {
        type: JOIN_GAME
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
    //console.log('dispatching storename')
    return {
        type: NAME,
        payload: {
            'name': name
        }
    }
}

