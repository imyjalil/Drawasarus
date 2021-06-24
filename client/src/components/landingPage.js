import React, { Component } from 'react';
import eventHandler from '../utilities/eventHandler';
import { withRouter } from 'react-router';
import events from '../utilities/constants'

class LandingPage extends Component {
    //Landing page should receive methods props
    constructor(props) {
        super(props);
        this.state = {};
        props.updateCreated()
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

        this.props.updateSocket(ws)

        this.props.updateGameId(gameId)
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


    joinButtonHandler = async () => {

        let ws = await this.initiateWebsocket()
         

        let name = document.getElementById('name').value
        let gameId = document.getElementById('gameId').value


        this.setState({
            gameId:gameId
        })
        

        if (!this.state.clientId) {
            this.setState({ clientId: sessionStorage.getItem('clientId') })
        }

        await new Promise(r => setTimeout(r, 500));

      
        this.joinGame(this.state.gameId, this.state.clientId, name, ws)

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





    render() {
        return (
            <div className="LandingPage">
                <input type="text" id="name" defaultValue="name" /><br></br>
                <input type="button" value="Create" onClick={this.createButtonHandler} /><br></br>
                <input type="button" value="join" onClick={this.joinButtonHandler} />
                <input type="text" id="gameId" defaultValue="4"/>
            </div>
        )
    }
}

export default withRouter(LandingPage);