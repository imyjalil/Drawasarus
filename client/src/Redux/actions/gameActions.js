

import { DRAW, GUESS, ADD_PLAYER, REMOVE_PLAYER, UPDATE_PLAYER_LIST, SET_LOCAL_STREAM, SET_REMOTE_STREAM } from "../../utilities/constants"

export const draw = () => {
    return {
        type: DRAW
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

export const removePlayer = (id) => {
    return {
        type: REMOVE_PLAYER,
        payload: {
            'id': id
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