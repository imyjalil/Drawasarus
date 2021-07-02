

import { DRAW, GUESS } from "../../utilities/constants"

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