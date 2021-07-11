import { storeClientId, storeGameId } from '../Redux/actions/userActions';
import { removePlayer, signalChatEvent, updatePlayerList, setLocalStream } from '../Redux/actions/gameActions';
import { wsSendMessage } from '../Redux/actions/socketActions';
import events from './constants';


const iceServers = {
    iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
        { urls: 'stun:stun2.l.google.com:19302' },
        { urls: 'stun:stun3.l.google.com:19302' },
        { urls: 'stun:stun4.l.google.com:19302' },
    ],
}

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


                    // get the media access
                    navigator.mediaDevices.getUserMedia({
                        audio: true,
                        video: false
                    })
                        .then(function (stream) {
                            /* use the stream */
                            dispatch(setLocalStream(stream))
                        })
                        .catch(function (err) {
                            /* handle the error */
                            console.log("not able to get the local stream")
                        });


                    let joinPayload = {
                        'method': events.JOIN_GAME,
                        'clientId': clientId,
                        'gameId': state.user.gameId,
                        'name': state.user.name
                    }

                    dispatch(wsSendMessage(joinPayload))


                    break;
                case events.CREATE_GAME:

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



                    let players = state.game.players.map(player => player.id)

                    let newPlayers = data.playerlist

                    console.log("clientId", state.user.clientiId)

                    newPlayers.forEach(player => {
                        if (players.includes(player.id) == false && player.id != state.user.clientiId) {
                            console.log("--> new player", player.id)

                            let rtcPeerConnection = new RTCPeerConnection(iceServers)
                            // addLocalTracks(rtcPeerConnection)
                            // rtcPeerConnection.ontrack = setRemoteStream
                            // rtcPeerConnection.onicecandidate = sendIceCandidate
                            // await createOffer(rtcPeerConnection)
                        }
                    });

                    console.log("updating the playerlist")
                    dispatch(updatePlayerList(data))

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