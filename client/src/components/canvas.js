import React, { useEffect, useRef, useState } from "react";

const Canvas = (props) => {

    const [isDrawing, setIsDrawing] = useState(false);
    const canvasRef = useRef(null);
    const contextRef = useRef(null);

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


    //https://stackoverflow.com/questions/43955925/html5-responsive-canvas-mouse-position-and-resize
    const getMousePosition = (e) => {
        const canvas = canvasRef.current;
        var mouseX = e.offsetX * canvas.width / canvas.clientWidth | 0;
        var mouseY = e.offsetY * canvas.height / canvas.clientHeight | 0;
        return { x: mouseX, y: mouseY };
    }

    const startDrawing = ({ nativeEvent }) => {
        contextRef.current.beginPath();

        contextRef.current.moveTo(getMousePosition(nativeEvent).x, getMousePosition(nativeEvent).y);
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
        contextRef.current.lineTo(getMousePosition(nativeEvent).x, getMousePosition(nativeEvent).y);
        //console.log('line to ' + offsetX + ", " + offsetY)
        contextRef.current.stroke();
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
