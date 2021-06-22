import React, { Component } from 'react';
import './gamePage.css'
import Canvas from './canvas';
import LeaderBoard from './LeaderBoard';
import Chat from './Chat';
import Modal from './modal'
class GamePage extends Component {
    constructor(props) {
        super(props);
        console.log("gamepage props:")
        console.log(props)
        this.state = { showModal: false }
    }

    componentDidMount() {
        if (this.props.state.created === false) {
            this.setState({ showModal: true })
        }
    }

    hideModal = async () => {
        let name = document.getElementById('joinname').value
        this.setState({ showModal: false });
        //let ws = await this.initiateWebsocket()
        //need to somehow access initiateWebsocket() and joinGame in landingpage component
        //this.joinGame(this.state.gameId, this.state.clientId, name, ws)
    }

    render() {

        return (
            <div>
                <div className="col-sm-2 leaderBoard" >
                    <LeaderBoard players={this.props} />
                </div>
                <div className="col-sm-8 canvas">
                    <Canvas />
                </div>
                <div className="col-sm-2 chat" >
                    <Chat />
                </div>
                <Modal show={this.state.showModal} handleClose={this.hideModal} />
            </div>
        )
    }
}
export default GamePage;