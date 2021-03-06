import React, { useEffect, useRef, useState } from "react";
import { wsSendMessage } from "../Redux/actions/socketActions";
import { useDispatch, useSelector } from 'react-redux'
const events = require("../utilities/constants")

let x1, y1, x2, y2;

const Canvas = (props) => {

    let canDraw = props.canDraw
    const [isDrawing, setIsDrawing] = useState(false);
    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    const dispatch = useDispatch()
    let interval;
    let state = useSelector(state => {

        return {
            clientId: state.user.clientId,
            gameId: state.user.gameId,
            remoteCords: state.game.remoteCords,
            image: state.game.image,
            receivedDrawEvent: state.game.receivedDrawEvent,
            choice: state.game.choice,
            selector: state.game.selector,
            hint:state.game.hint,
            gameTime:parseInt(state.game.gameTime)
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

        // window.onresize = () => {

        //     console.log("resize")
        //     const canvas = canvasRef.current;
        //     canvas.style.width = '100%';
        //     canvas.style.height = '100%';
        //     canvas.width = canvas.offsetWidth;
        //     canvas.height = canvas.offsetHeight;
        // }

    }, []);

    useEffect(() => {

        const [oldx, oldy, newx, newy] = state.remoteCords;

        const lines = JSON.parse(sessionStorage.getItem("currentState"))

        if (lines != null) {
            lines.map((cord) => {
                const [oldx, oldy, newx, newy] = cord
                drawLine(oldx, oldy, newx, newy)
            })
            sessionStorage.removeItem("currentState")
        }

        drawLine(oldx, oldy, newx, newy)
    }, [state.receivedDrawEvent])

    useEffect(()=>{
        if(props.canDraw){
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");
            let timeLeft=state.gameTime
            
            let gameTimer = setInterval(()=>{
                if(timeLeft<1)
                {
                    clearInterval(gameTimer)
                }
                else{
                    timeLeft=timeLeft-1
                    var newText=""+timeLeft
                    var metrics=context.measureText(newText)
                    context.clearRect(canvas.width-75-metrics.width,0,canvas.width,25)
                    context.fillText(newText,canvas.width - 75, 25)                   
                }
            },1000)
        }
    },[props.canDraw])

    const drawLine = (x1, y1, x2, y2) => {

        contextRef.current.beginPath();
        contextRef.current.moveTo(x1, y1);
        contextRef.current.lineTo(x2, y2);
        contextRef.current.stroke()
        contextRef.current.closePath();
    }

    useEffect(() => {
        if (state.choice !== null) {
            clearCanvas()
        }
    }, [state.choice])

    useEffect(() => {
        if (state.selector !== null) {
            clearCanvas()
        }
    }, [state.selector])

    useEffect(() => {
        if (state.image != null) {
            // var image = new Image();
            // image.src = state.image;
            // contextRef.current.drawImage(image, 0, 0)
        }

    }, [state.image])

    useEffect(()=>{
        if(state.hint!=null){
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");
            let timeLeft=state.gameTime
            
            let gameTimer = setInterval(()=>{
                if(timeLeft<1)
                {
                    clearInterval(gameTimer)
                }
                else{
                    timeLeft=timeLeft-1
                    var newText=state.hint+"   "+timeLeft
                    var metrics=context.measureText(newText)
                    context.clearRect(canvas.width-75-metrics.width,0,canvas.width,25)
                    context.fillText(newText,canvas.width - 75, 25)                   
                }
            },1000)
        }
    },[state.hint])

    function clearCanvas() {
        const canvas = canvasRef.current
        contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
    }

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
        setIsDrawing(true);
    };

    const finishDrawing = () => {
        contextRef.current.closePath();
        setIsDrawing(false);
        clearInterval(interval)
    };

    const draw = ({ nativeEvent }) => {
        if (!isDrawing) {
            return;
        }

        x2 = getMousePosition(nativeEvent).x
        y2 = getMousePosition(nativeEvent).y

        const payload = {
            'method': events.SET_REMOTE_CORDS,
            'gameId': state.gameId,
            'clientId': state.clientId,
            cords: [x1, y1, x2, y2]
        }

        dispatch(wsSendMessage(payload))

        // interval = setInterval(() => {
        //     dispatch(wsSendMessage(payload))
        // }, 150)

        contextRef.current.lineTo(x2, y2);
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