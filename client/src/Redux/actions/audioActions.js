const constants = require("../../utilities/constants")

export const muteAudio = (userId) => {
    return {
        type: constants.MUTE,
        payload: {
            'id': userId
        }
    }
}

export const unmuteAudio = (userId) => {
    return {
        type: constants.UNMUTE,
        payload: {
            'id': userId
        }
    }
}