import React, { useEffect, useRef, useState } from "react";
import { wsSendMessage } from "../Redux/actions/socketActions";
import events from '../utilities/constants'
import { useDispatch, useSelector } from 'react-redux'
import { remoteCords } from "../Redux/actions/gameActions";



let x1, y1, x2, y2;


const Canvas = () => {

    const [isDrawing, setIsDrawing] = useState(false);
    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    const dispatch = useDispatch()

    let state = useSelector(state => {

        return {
            clientId: state.user.clientId,
            gameId: state.user.gameId,
            remoteCords: state.game.remoteCords,
            receivedDrawEvent: state.game.receivedDrawEvent
        }
    })

    console.log("remote", state.remoteCords)

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = parseInt(getComputedStyle(document.querySelector('#canvasElement')).getPropertyValue('width'))
        canvas.height = window.innerHeight;
        canvas.style.width = `100%`;
        canvas.style.height = `100%`;
        const context = canvas.getContext("2d");
        //context.scale(2, 2);
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.lineWidth = 2;
        contextRef.current = context;
    }, []);

    useEffect(() => {

        console.log("remote canvas", state.remoteCords)
        const { oldx, oldy, newx, newy } = state.remoteCords;
        contextRef.current.moveTo(oldx, oldy);
        contextRef.current.lineTo(newx, newy);
        contextRef.current.stroke();


    }, [state.receivedDrawEvent])



    //https://stackoverflow.com/questions/43955925/html5-responsive-canvas-mouse-position-and-resize
    const getMousePosition = (e) => {
        const canvas = canvasRef.current;
        var mouseX = e.offsetX * canvas.width / canvas.clientWidth | 0;
        var mouseY = e.offsetY * canvas.height / canvas.clientHeight | 0;
        return { x: mouseX, y: mouseY };
    }

    const startDrawing = ({ nativeEvent }) => {
        contextRef.current.beginPath();



        x1 = getMousePosition(nativeEvent).x
        y1 = getMousePosition(nativeEvent).y

        contextRef.current.moveTo(x1, y1);
        console.log('moved to ' + x1 + ", " + y1)
        setIsDrawing(true);
    };

    const finishDrawing = () => {
        contextRef.current.closePath();
        setIsDrawing(false);
    };

    const draw = ({ nativeEvent }) => {
        if (!isDrawing) {
            return;
        }

        x2 = getMousePosition(nativeEvent).x
        y2 = getMousePosition(nativeEvent).y

        console.log(x1, y1, x2, y2)

        const payload = {
            'method': events.SET_REMOTE_CORDS,
            'gameId': state.gameId,
            'clientid': state.clientId,
            cords: [x1, y1, x2, y2]
        }

        dispatch(wsSendMessage(payload))

        contextRef.current.lineTo(x2, y2);
        //console.log('line to ' + offsetX + ", " + offsetY)
        contextRef.current.stroke();





        x1 = x2;
        y1 = y2;



        // let payload = {
        //     'method':events.DRAW,
        //     'clientId': props.clientId,
        //     'gameId':props.gameId,
        //     'canvasEvent':[x1,y1,x2,y2]
        // }

        // console.log(canvasRef.current.toDataURL("image/png"))

        // let ws = props.ws
        // ws.send(JSON.stringify(payload))




    };

    let canvasStyle = {
        width: `100%`
    }
    return (
        <canvas
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={draw}
            ref={canvasRef}
            id="canvasElement"
            style={canvasStyle}
        />
    );
}

export default Canvas
