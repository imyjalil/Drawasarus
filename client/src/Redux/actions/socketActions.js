import { WS_CONNECT, WS_DISCONNECT, WS_SEND_MESSAGE } from "../../utilities/constants"


export const wsConnect = (host) => {
    return {
        type: WS_CONNECT,
        host: host
    }
}

export const wsDisconnect = (host) => {
    return {
        type: WS_DISCONNECT,
        host: host
    }
}

export const wsSendMessage = (payload) => {
    console.log('dispatchinf sendmessage')
    return {
        type: WS_SEND_MESSAGE,
        payload: payload
    }
}
