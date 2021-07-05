import React, { useEffect, useRef, useState } from "react";
import events from '../utilities/constants'
import { useDispatch, useSelector } from 'react-redux'
import { wsSendMessage } from '../Redux/actions/socketActions'

const Canvas = () => {

    const [isDrawing, setIsDrawing] = useState(false);
    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    const dispatch = useDispatch()
    let state = useSelector(state => {
        return {
            clientId: state.user.clientId,
            gameId: state.user.gameId,
            canvasImage: state.user.canvasImage
        }
    })

    let x1, y1, x2, y2;

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
        context.lineWidth = 3;
        contextRef.current = context;
    }, []);

    useEffect(() => {

        console.log('canvas image use effect change')
        if (state.canvasImage != null) {
            let canvasImage = state.canvasImage.canvasImage
            console.log('drawing')
            //console.log(canvasImage.length)
            console.log(canvasImage)
            let image = new Image()
            image.src = canvasImage
            let canvasElement = document.getElementById('canvasElement')
            let ctx = canvasElement.getContext('2d')
            ctx.drawImage(image, 0, 0)
        }
    }, [state.canvasImage])
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
        //console.log('moved to ' + offsetX + ", " + offsetY)
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

        contextRef.current.lineTo(x2, y2);
        //console.log('line to ' + offsetX + ", " + offsetY)
        contextRef.current.stroke();

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

    const sendCanvasImage = () => {
        let canvas = document.getElementById('canvasElement')
        var base64ImageData = canvas.toDataURL("image/png");
        console.log(base64ImageData)
        let message = {
            'method': events.DRAW,
            'gameId': state.gameId,
            'clientId': state.clientId,
            'canvasImage': base64ImageData
        }
        dispatch(wsSendMessage(message))
    }

    let canvasStyle = {
        width: `100%`
    }
    return (
        <div>
            <input type="button" value="senddata" onClick={sendCanvasImage} />
            <canvas
                onMouseDown={startDrawing}
                onMouseUp={finishDrawing}
                onMouseMove={draw}
                ref={canvasRef}
                id="canvasElement"
                className="canvasElement"
                style={canvasStyle}
            />
        </div>
    );
}

export default Canvas
