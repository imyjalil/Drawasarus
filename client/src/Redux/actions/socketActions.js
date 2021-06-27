import { WS_CONNECT, WS_DISCONNECT } from "../../utilities/constants"


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

