import events from './constants';

let eventHandler = (event, { addPlayer, addPoints }) => {
    //console.log('event received:')
    if (event && event.data) {
        let data = JSON.parse(event.data)
        if (data && data.method) {
            //console.log('event type:' + data.method)
            switch (data.method) {

                case events.CONNECT:
                    //console.log('connect event');
                    let clientId = data.clientId;
                    sessionStorage.setItem('clientId', clientId);
                    //console.log('client id:' + clientId);

                    break;
                case events.CREATE_GAME:
                    //store game id
                    //console.log('create event');
                    //console.log(data)
                    let gameId = data.gameId
                    sessionStorage.setItem('gameId', gameId)
                    //console.log('game id:' + gameId)
                    break;

                default:
                    console.log('other event:' + data.method)
            }
        }
    }
}

export default eventHandler;