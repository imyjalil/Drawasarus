import React, { Component } from 'react';
import eventHandler from '../utilities/eventHandler';
import { withRouter } from 'react-router';
import events from '../utilities/constants'

class LandingPage extends Component {
    //Landing page should receive methods props
    constructor(props) {
        super(props);
        this.state = {};
    }

    initiateWebsocket = async () => {
        let ws = new WebSocket('ws://localhost:9090/')
        ws.addEventListener('open', event => {
            //console.log('open received')
            ws.onmessage = (event) => {
                eventHandler(event, this.props);
            }
        })

        await new Promise(r => setTimeout(r, 500));
        //console.log('websocket initialised')
        return ws
    }

    joinGame = async (gameId, clientId, name, ws) => {
        let payload = {
            'method': events.JOIN,
            'gameId': gameId,
            'clientId': clientId,
            'name': name
        }
        ws.send(JSON.stringify(payload))
        await new Promise(r => setTimeout(r, 500));
        //console.log('game joined....redirecting to game page')
        this.props.history.push({
            pathname: "/game/" + gameId,
            state: {}
        })
    }

    createButtonHandler = async () => {
        //console.log('create button clicked')

        let ws = await this.initiateWebsocket()
        let name = document.getElementById('name').value

        if (!this.state.clientId) {
            this.setState({ clientId: sessionStorage.getItem('clientId') })
        }

        let createPayload = {
            'method': events.CREATE_GAME,
            'clientId': this.state.clientId
        }

        await new Promise(r => setTimeout(r, 500));

        ws.send(JSON.stringify(createPayload))

        await new Promise(r => setTimeout(r, 500));

        if (!this.state.gameId) {
            this.setState({ gameId: sessionStorage.getItem('gameId') })
        }

        this.joinGame(this.state.gameId, this.state.clientId, name, ws)
    }

    joinButtonHandler = async () => {
        //console.log('join button clicked')
        let name = document.getElementById('name').value
        let ws = await this.initiateWebsocket()
        this.joinGame(this.state.gameId, this.state.clientId, name, ws)
    }

    render() {
        return (
            <div className="LandingPage">
                <input type="text" id="name" defaultValue="name" />
                <input type="button" value="Join" onClick={this.joinButtonHandler} />
                <input type="button" value="Create" onClick={this.createButtonHandler} />
            </div>
        )
    }
}

export default withRouter(LandingPage);