import React, { useEffect, useRef, useState } from "react";
import { wsSendMessage } from "../Redux/actions/socketActions";
import events from '../utilities/constants'
import { useDispatch, useSelector } from 'react-redux'
import { remoteCords } from "../Redux/actions/gameActions";



let count1 = 0;
let count2 = 0;

const Canvas = () => {

    console.log("render")

    const [isDrawing, setIsDrawing] = useState(false);
    const [prevX, setPrevX] = useState(null)
    const [prevY, setPrevY] = useState(null)
    const [x, setX] = useState(null)
    const [y, setY] = useState(null)

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
        count2++;
        drawLine(oldx, oldy, newx, newy)
        console.log("useeffect ",count2)


    }, [state.receivedDrawEvent])



    //https://stackoverflow.com/questions/43955925/html5-responsive-canvas-mouse-position-and-resize
    const getMousePosition = (e) => {
        const canvas = canvasRef.current;
        var mouseX = e.offsetX * canvas.width / canvas.clientWidth | 0;
        var mouseY = e.offsetY * canvas.height / canvas.clientHeight | 0;
        return { x: mouseX, y: mouseY };
    }

    const drawLine = (x1, y1, x2, y2) => {

        console.log("drawing")
        contextRef.current.beginPath();
        contextRef.current.moveTo(x1, y1);
        contextRef.current.lineTo(x2, y2);
        contextRef.current.stroke()
        contextRef.current.closePath();
    }

    const startDrawing = ({ nativeEvent }) => {

        // set the current x,y as prev cords
        setPrevX(x)
        setPrevY(y)
        setIsDrawing(true);

        console.log("prev x,y", prevX, prevY)
    };

    const finishDrawing = () => {
        setIsDrawing(false);
    };

    const draw = ({ nativeEvent }) => {

        let x = getMousePosition(nativeEvent).x
        let y = getMousePosition(nativeEvent).y

        setX(x)
        setY(y)

        if (!isDrawing) return;

        // console.log("Drawing", x, y)
        count1++;
        console.log("draw",count1)
        drawLine(prevX, prevY, x, y)

        setPrevX(x)
        setPrevY(y)

        const payload = {
            'method': events.SET_REMOTE_CORDS,
            'gameId': state.gameId,
            'clientId': state.clientId,
            cords: [prevX, prevY, x, y]
        }

        dispatch(wsSendMessage(payload))
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
