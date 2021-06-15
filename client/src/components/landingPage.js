import React, { Component } from 'react';
import eventHandler from '../utilities/eventHandler';

class LandingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }
    createButtonHandler = () => {
        let ws = new WebSocket('ws://localhost:9090/')
        ws.addEventListener('message', (event) => {
            eventHandler(event);
        })
        ws.onopen = (event) => {
            console.log(event)
            let payload = {
                "method": "user"
            }
            ws.send(JSON.stringify(payload));
            // let req = JSON.parse(event.data);
            // if (req.method === 'connect') {
            //     let clientId = req.clientId;
            //     this.setState({ clientId: clientId });
            //     console.log('clientid:' + this.state.clientId);
            // }
        }
        // ws.onmessage = (event) => {
        //     eventHandler(event);
        // }
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