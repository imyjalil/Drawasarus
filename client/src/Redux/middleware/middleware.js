const { WS_CONNECT, WS_DISCONNECT, WS_SEND_MESSAGE } = require("../../utilities/constants")
const { wsConnect, wsDisconnect } = require("../actions/socketActions")

const socketMiddleware = () => {

    // scope ?
    let socket = null
    let host = ''


    // the below three returns the callbacks

    const onMessage = (store) => (event) => {
        console.log("on message")
        console.log(event)
    }

    const onOpen = (store) => (event) => {
        console.log("web socket connection opened")
    }

    const onClose = (store) => (event) => {
        console.log("web socket connection closed")
    }




    // middle ware
    return store => next => action => {

        switch (action.type) {

            case WS_CONNECT:

                console.log('middle ware', WS_CONNECT)
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

                console.log('reducer', WS_DISCONNECT)
                if (socket != null) {
                    socket.close()
                }
                socket = null
                host = ''
                break;
            case WS_SEND_MESSAGE:

                console.log("sending the message", action.payload)
                socket.send(JSON.stringify(action.payload))
                break;
            default:
                console.log("action type", action.type, " not found")
        }


        return next(action)

    }


}

export default socketMiddleware