import React, { useEffect, useRef, useState } from "react";
import { wsSendMessage } from "../Redux/actions/socketActions";
import events from '../utilities/constants'
import { useDispatch, useSelector } from 'react-redux'
import { remoteCords } from "../Redux/actions/gameActions";



let x1, y1, x2, y2;


const Canvas = () => {

    const [canDraw, startDraw] = useState(false)
    const [isDrawing, setIsDrawing] = useState(false);
    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    const dispatch = useDispatch()

    let state = useSelector(state => {

        return {
            clientId: state.user.clientId,
            gameId: state.user.gameId,
            remoteCords: state.game.remoteCords,
            image: state.game.image,
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

        console.log("Image event", state.image)

        if (state.image != null) {
            var image = new Image();
            image.src = state.image;
            contextRef.current.drawImage(image, 0, 0)
        }


    }, [state.image])



    //https://stackoverflow.com/questions/43955925/html5-responsive-canvas-mouse-position-and-resize
    const getMousePosition = (e) => {
        const canvas = canvasRef.current;
        var mouseX = e.offsetX * canvas.width / canvas.clientWidth | 0;
        var mouseY = e.offsetY * canvas.height / canvas.clientHeight | 0;
        return { x: mouseX, y: mouseY };
    }

    const startDrawing = ({ nativeEvent }) => {
        if (!canDraw) return
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

        let payload = {
            'method': events.DRAW,
            'clientId': state.clientId,
            'gameId': state.gameId,
            'canvasEvent': canvasRef.current.toDataURL("image/png")
        }

        setInterval(() => {
            dispatch(wsSendMessage(payload))
        }, 150)



        contextRef.current.lineTo(x2, y2);
        //console.log('line to ' + offsetX + ", " + offsetY)
        contextRef.current.stroke();
        x1 = x2;
        y1 = y2;
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
            disabled
        />
    );
}

export default Canvas
