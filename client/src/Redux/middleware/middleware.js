import eventHandler from "../../utilities/eventHandler"

const { WS_CONNECT, WS_DISCONNECT, WS_SEND_MESSAGE } = require("../../utilities/constants")
const { wsConnect, wsDisconnect } = require("../actions/socketActions")


const socketMiddleware = () => {

    let socket = null
    let host = ''

    const onMessage = (store) => (event) => {
        eventHandler(event, store.dispatch, store.getState())

    }

    const onOpen = (store) => (event) => {
        console.log("web socket connection opened")
    }

    const onClose = (store) => (event) => {
        console.log("web socket connection closed")
    }

    // middleware
    return store => next => action => {

        switch (action.type) {

            case WS_CONNECT:
                if (socket != null) {
                    socket.close()
                    host = ''
                }
                socket = new WebSocket(action.host)

                // register handlers
                socket.onmessage = onMessage(store)
                socket.onclose = onClose(store)
                socket.onopen = onOpen(store)
                break;

            case WS_DISCONNECT:
                if (socket != null) {
                    socket.close()
                }
                socket = null
                host = ''
                break;
            case WS_SEND_MESSAGE:
                socket.send(JSON.stringify(action.payload))
                break;
            default:
                break;
        }


        return next(action)

    }


}

export default socketMiddleware