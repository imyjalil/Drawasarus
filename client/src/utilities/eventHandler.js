import events from './constants';

let eventHandler = (event) => {
    console.log('event received:')
    console.log(event)
    if (event && event.data) {
        let data = JSON.parse(event.data)
        if (data && data.method) {
            switch (data.method) {

                case events.CONNECT:
                    console.log('connect');
                    let clientId = data.clientId;
                    sessionStorage.setItem('clientId', clientId);
                    console.log('client id:' + clientId);
            }
        }
    }
}

export default eventHandler;