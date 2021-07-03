

import { DRAW, GUESS, ADD_PLAYER, REMOVE_PLAYER, UPDATE_PLAYER_LIST } from "../../utilities/constants"

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

export const updatePlayerList = (playerList) => {

    return {
        type: UPDATE_PLAYER_LIST,
        payload: playerList
    }
}

export const removePlayer = (id) => {
    return {
        type: REMOVE_PLAYER,
        payload: id
    }
}