import { storeClientId, storeGameId, setClientCreation, setGameCreation } from '../Redux/actions/userActions';
import events from './constants';

const eventHandler = (event, dispatch) => {
    console.log('event received:')
    if (event && event.data) {
        let data = JSON.parse(event.data)

        console.log(data)
        if (data && data.method) {
            console.log('event type:' + data.method)
            switch (data.method) {

                case events.CONNECT:
                    //console.log('connect event');
                    let clientId = data.clientId;
                    console.log("dispatch client id")
                    dispatch(storeClientId(clientId))
                    dispatch(setClientCreation(true))
                    // sessionStorage.setItem('clientId', clientId);
                    //console.log('client id:' + clientId);

                    break;
                case events.CREATE_GAME:
                    //store game idsend clien t
                    //console.log('create event');
                    //console.log(data)
                    let gameId = data.gameId
                    dispatch(storeGameId(gameId))
                    dispatch(setGameCreation(true))
                    //console.log('game id:' + gameId)
                    break;

                case events.JOIN:
                    let otherUser = data.name
                    console.log(otherUser, "Joined")
                    break;

                default:
                    console.log('other event:' + data.method)
            }
        }
    }
}

export default eventHandler;