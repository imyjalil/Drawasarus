import React, { Component } from 'react';
import './gamePage.css'
import Canvas from './canvas';
class GamePage extends Component {


    render() {
        let canvasRef = React.createRef(null)
        return (
            <div className="row">
                <div className="col-sm-2 leaderBoard" >Leaderboard</div>
                <div className="col-sm-8 canvas" ref={canvasRef}>
                    <Canvas width={canvasRef.current.offsetWidth} height={canvasRef.current.offsetWidth} />
                </div>
                <div className="col-sm-2 chat" >chat</div>
            </div>
        )
    }
}
export default GamePage;