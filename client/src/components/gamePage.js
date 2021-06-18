import React, { Component } from 'react';
import './gamePage.css'
import Canvas from './canvas';
class GamePage extends Component {


    render() {
        return (
            <div className="row">
                <div className="col-sm-2 leaderBoard" >Leaderboard</div>
                <div className="col-sm-8 canvas">
                    <Canvas />
                </div>
                <div className="col-sm-2 chat" >chat</div>
            </div>
        )
    }
}
export default GamePage;