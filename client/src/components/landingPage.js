import React, { Component } from 'react';
import eventHandler from '../utilities/eventHandler';

class LandingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }
    createButtonHandler = async () => {
        console.log('button clicked')
        let ws = new WebSocket('ws://localhost:9090/')
        ws.addEventListener('open', event => {
            console.log('open recived')
            ws.onmessage = (event) => {
                eventHandler(event);
            }
        })

        await new Promise(r => setTimeout(r, 500));

        if (!this.state.clientId) {
            this.setState({ clientId: sessionStorage.getItem('clientId') })
        }
        let createPayload = {
            'method': 'create',
            'clientId': this.state.clientId
        }
        ws.send(createPayload)
    }

    joinButtonHandler = () => {

    }

    render() {
        return (
            <div className="LandingPage">
                <input type="button" value="Create" onClick={this.createButtonHandler} />
                <input type="button" value="Join" onClick={this.joinButtonHandler} />
            </div>
        )
    }
}

export default LandingPage;