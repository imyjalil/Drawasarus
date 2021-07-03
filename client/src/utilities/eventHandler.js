import { storeClientId, storeGameId } from '../Redux/actions/userActions';
import { removePlayer, signalChatEvent, updatePlayerList } from '../Redux/actions/gameActions';
import { wsSendMessage } from '../Redux/actions/socketActions';
import events from './constants';

const eventHandler = (event, dispatch, state) => {
    console.log('event received:')
    if (event && event.data) {
        let data = JSON.parse(event.data)

        console.log(data)
        if (data && data.method) {
            console.log('In event, handler event type:' + data.method)

            switch (data.method) {

                case events.CONNECT:
                    //console.log('connect event');
                    let clientId = data.clientId;

                    console.log("dispatch client id")
                    dispatch(storeClientId(clientId))
                    // dispatch(setClientCreation(true))

                    let joinPayload = {
                        'method': events.JOIN_GAME,
                        'clientId': clientId,
                        'gameId': state.user.gameId,
                        'name': state.user.name
                    }
                    dispatch(wsSendMessage(joinPayload))


                    break;
                case events.CREATE_GAME:
                    //store game idsend clien t
                    //console.log('create event');
                    //console.log(data)
                    let gameId = data.gameId
                    dispatch(storeGameId(gameId))
                    sessionStorage.setItem('gameId', gameId);
                    break;

                case events.JOIN_GAME:
                    let otherUser = data.name
                    console.log(otherUser, "Joined")
                    break;

                case events.GUESS:
                    dispatch(signalChatEvent(data))
                    break;
                case events.UPDATE_PLAYER_LIST:
                    console.log("updating the playerlist")
                    dispatch(updatePlayerList(data.playerlist))

                case events.REMOVE_PLAYER:
                    dispatch(removePlayer(data.id))
                    break;

                default:
                    console.log('other event:' + data.method)
            }
        }
    }
}

export default eventHandler;