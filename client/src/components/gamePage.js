import React, { Component } from 'react';
import './gamePage.css'
import Canvas from './canvas';
import LeaderBoard from './LeaderBoard';
import Chat from './Chat';

class GamePage extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-sm-2 leaderBoard" >
                    <LeaderBoard players={this.props} />
                </div>
                <div className="col-sm-8 canvas">
                    <Canvas />
                </div>
                <div className="col-sm-2 chat" >
                    <Chat />
                </div>
            </div>
        )
    }
}
export default GamePage;