import events from './constants';

let eventHandler = (event) => {
    switch (event) {
        case events.CONNECT:
            console.log('connect');
            let clientId = event.clientId;
            this.setState({ clientId: clientId });
            console.log('client id:' + this.state.clientId);
    }
}

export default eventHandler;