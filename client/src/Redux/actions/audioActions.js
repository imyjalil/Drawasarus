import { MUTE, UNMUTE } from "../../utilities/constants"

export const muteAudio = (userId) => {
    return {
        type: MUTE,
        payload: {
            'id': userId
        }
    }
}

export const unmuteAudio = (userId) => {
    return {
        type: UNMUTE,
        payload: {
            'id': userId
        }
    }
}