

import { DRAW, GUESS } from "../../utilities/constants"

// export const draw = () => {
//     return {
//         type: DRAW
//     }
// }

export const signalChatEvent = (chatEvent) => {
    console.log('game action')
    console.log(chatEvent)
    return {
        type: GUESS,
        payload: {
            'chatEvent': chatEvent
        }
    }
}

export const setCanvasImage = (canvasImage) => {
    console.log('setCanvasImage')
    return {
        type: DRAW,
        payload: {
            'canvasImage': canvasImage
        }
    }
}