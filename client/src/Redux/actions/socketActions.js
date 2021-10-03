const constants = require("../../utilities/constants")

export const wsConnect = (host) => {
    return {
        type: constants.WS_CONNECT,
        host: host
    }
}

export const wsDisconnect = (host) => {
    return {
        type: constants.WS_DISCONNECT,
        host: host
    }
}

export const wsSendMessage = (payload) => {
    return {
        type: constants.WS_SEND_MESSAGE,
        payload: payload
    }
}
