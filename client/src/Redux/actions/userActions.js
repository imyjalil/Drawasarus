import axios from 'axios'
import config from '../../config'
const constants = require("../../utilities/constants")

export const createGame = () => (dispatch) => {
    return axios.post(config.URL + "create-game")
        .then(response => {
            response = response.data
            dispatch(storeGameId(response.gameId))
            return `game/${response.gameId}`
        })
        .catch(error => {
            return ''
            alert('Unable to start Game. Please try later')
        })

}

export const joinGame = () => {
    return {
        type: constants.JOIN_GAME
    }
}
export const connect = () => {
    return {
        type: constants.CONNECT
    }
}

export const createSocket = (ws) => {
    return {
        type: constants.SOCKET,
        payload: {
            'ws': ws
        }
    }
}

export const storeClientId = (clientId) => {
    return {
        type: constants.CLIENT_ID,
        payload: {
            'clientId': clientId
        }
    }
}

export const storeGameId = (gameId) => {
    return {
        type: constants.GAME_ID,
        payload: {
            'gameId': gameId
        }
    }
}

export const storeName = (name) => {
    return {
        type: constants.NAME,
        payload: {
            'name': name
        }
    }
}

export const setCreator = () => {
    return {
        type: 'set_create'
    }
}