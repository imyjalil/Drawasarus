

import { CORDS,UPDATE_POINTS, DRAW, GUESS, ADD_PLAYER, REMOVE_PLAYER, UPDATE_PLAYER_LIST, SET_LOCAL_STREAM, SET_REMOTE_STREAM, SET_REMOTE_CORDS } from "../../utilities/constants"

export const draw = (image) => {
    return {
        type: DRAW,
        payload: {
            'image': image.canvasEvent
        }
    }
}

export const signalChatEvent = (chatEvent) => {
    return {
        type: GUESS,
        payload: {
            'chatEvent': chatEvent
        }
    }
}

export const updatePlayerList = (updatePlayers) => {

    return {
        type: UPDATE_PLAYER_LIST,
        payload: updatePlayers
    }
}

export const updatePoints = (points, clientId) => {
    return {
        type: UPDATE_POINTS,
        payload: {
            'points': points,
            'clientId': clientId
        }
    }
}

export const removePlayer = (id) => {
    return {
        type: REMOVE_PLAYER,
        payload: {
            'id': id
        }
    }
}

export const remoteCords = (data) => {
    return {
        type: SET_REMOTE_CORDS,
        payload: {
            'cords': data.cords
        }
    }
}

export const setLocalStream = (stream) => {
    return {
        type: SET_LOCAL_STREAM,
        payload: {
            'stream': stream
        }
    }
}

export const setRemoteStream = (stream, id) => {
    return {
        type: SET_REMOTE_STREAM,
        payload: {
            'stream': stream,
            'id': id
        }
    }
}

export const setChoice = (words) => {
    return {
        type: 'CHOICE',
        payload: {
            'words': words
        }
    }
}

export const setSelector = (name) => {
    return {
        type: 'SELECTOR',
        payload: {
            'name': name
        }
    }
}

export const setWordHint = (hint) => {
    return {
        type: 'HINT',
        payload: {
            'hint': hint
        }
    }
}