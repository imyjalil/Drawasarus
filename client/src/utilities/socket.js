import { createSocket } from "../Redux/actions/userActions"
import eventHandler from "./eventHandler"



const initiateWebsocket = async (dispatch,state) => {

    // sync
    let ws = new WebSocket('ws://localhost:9090/')

    console.log("dispatch socket")
    dispatch(createSocket(ws))

    console.log("after socket update",state)

    ws.addEventListener('open', event => {
        //console.log('open received')
        ws.onmessage = (event) => {
            eventHandler(event, dispatch);
        }
    })



    await new Promise(r => setTimeout(r, 500));
    console.log('websocket initialised')
    console.log(state)
    


}

export default initiateWebsocket;