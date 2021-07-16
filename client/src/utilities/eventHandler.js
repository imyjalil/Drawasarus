import { storeClientId, storeGameId } from '../Redux/actions/userActions';
import { removePlayer, signalChatEvent, updatePlayerList, draw, setChoice, setSelector, setWordHint } from '../Redux/actions/gameActions';
import { wsSendMessage } from '../Redux/actions/socketActions';
import events from './constants';

let localStream;
let connections = {};
let remoteStreams = {};

const mediaConstraints = {
    audio: true,
    video: false
}

// const mediaConstraints = {
//     audio: true,
//     video: { width: 1280, height: 720 },
// }

const iceServers = {
    iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
        { urls: 'stun:stun2.l.google.com:19302' },
        { urls: 'stun:stun3.l.google.com:19302' },
        { urls: 'stun:stun4.l.google.com:19302' },
    ],
}

function addLocalTracks(rtcPeerConnection) {
    console.log('addLocalTracks:')
    console.log(localStream)
    localStream.getTracks().forEach((track) => {
        rtcPeerConnection.addTrack(track, localStream)
    })
}

const eventHandler = async (event, dispatch, state) => {


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

                    let joinPayload = {
                        'method': events.JOIN_GAME,
                        'clientId': clientId,
                        'gameId': state.user.gameId,
                        'name': state.user.name
                    }

                    dispatch(wsSendMessage(joinPayload))

                    localStream = await navigator.mediaDevices.getUserMedia(mediaConstraints)
                    console.log('localStream fetched:')
                    console.log(localStream)
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

                case 'TURN':
                    dispatch(setChoice(data.words))
                    break

                case 'WAIT':
                    dispatch(setSelector(data.name))
                    break

                case 'wordselect':
                    dispatch(setWordHint(data.hint))
                    break

                case events.GUESS:
                    dispatch(signalChatEvent(data))
                    break;
                case events.DRAW:
                    dispatch(draw(data))
                    break;

                case events.SET_REMOTE_CORDS:
                    // dispatch(remoteCords(data))
                    break;

                case 'prevClients':
                    let prevClients = data.clients
                    while (localStream == null || localStream == undefined) {
                        await new Promise(r => setTimeout(r, 100));
                    }
                    for (let player of prevClients) {
                        console.log("--> new player", player)
                        console.log(state)
                        let rtcPeerConnection = new RTCPeerConnection(iceServers)
                        connections[player] = rtcPeerConnection
                        addLocalTracks(rtcPeerConnection)

                        rtcPeerConnection.ontrack = (event) => {
                            //create an audio element and attach stream to it
                            console.log('9848022338 prevclients')
                            console.log(event)
                            let audioElement = document.createElement("video")
                            audioElement.autoplay = "autoplay"
                            audioElement.srcObject = event.streams[0]
                            document.getElementById('audioEvents').appendChild(audioElement)
                            remoteStreams[player] = event.streams[0]
                        }
                        rtcPeerConnection.onicecandidate = (event) => {
                            if (event.candidate) {
                                let iceCandidatePayload = {
                                    'method': 'sendIceCandidate',
                                    'senderId': state.user.clientId,
                                    'receiverId': player,
                                    label: event.candidate.sdpMLineIndex,
                                    candidate: event.candidate.candidate
                                }
                                dispatch(wsSendMessage(iceCandidatePayload))
                            }
                        }
                        console.log('before offer creation')
                        let offercreation = await async function () {
                            console.log('in offer creation')
                            let sessionDescription
                            try {
                                sessionDescription = await rtcPeerConnection.createOffer()
                                rtcPeerConnection.setLocalDescription(sessionDescription)
                                console.log('offer creation succeeded')
                            } catch (error) {
                                console.log('error in setting session desc')
                            }

                            let webRTCOfferPayload = {
                                'method': 'webRTCOffer',
                                sdp: sessionDescription,
                                'senderId': state.user.clientId,
                                'receiverId': player
                            }
                            console.log('sending offer websocket')
                            dispatch(wsSendMessage(webRTCOfferPayload))
                        }()
                    }
                    break

                case events.UPDATE_PLAYER_LIST:
                    console.log("updating the playerlist")
                    dispatch(updatePlayerList(data))
                    break

                case events.REMOVE_PLAYER:
                    dispatch(removePlayer(data.id))
                    break;

                case 'webRTCOffer':
                    console.log('webrtcoffer')
                    console.log(data)
                    let rtcPeerConnection = new RTCPeerConnection(iceServers)
                    connections[data.senderId] = rtcPeerConnection
                    addLocalTracks(rtcPeerConnection)

                    rtcPeerConnection.ontrack = (event) => {
                        //create an audio element and attach stream to it
                        console.log('9848022338 offer')
                        console.log(event)
                        let audioElement = document.createElement("video")
                        audioElement.autoplay = "autoplay"
                        audioElement.srcObject = event.streams[0]
                        document.getElementById('audioEvents').appendChild(audioElement)
                        remoteStreams[data.senderId] = event.streams[0]
                    }

                    rtcPeerConnection.onicecandidate = (event) => {
                        if (event.candidate) {
                            let iceCandidatePayload = {
                                'method': 'sendIceCandidate',
                                'senderId': state.user.clientId,
                                'receiverId': data.senderId,
                                label: event.candidate.sdpMLineIndex,
                                candidate: event.candidate.candidate
                            }
                            dispatch(wsSendMessage(iceCandidatePayload))
                        }
                    }


                    rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(data.sdp))

                    let answerCreation = await async function () {
                        console.log('in offer creation')
                        let sessionDescription
                        try {
                            sessionDescription = await rtcPeerConnection.createAnswer()
                            rtcPeerConnection.setLocalDescription(sessionDescription)
                            console.log('offer creation succeeded')
                        } catch (error) {
                            console.log('error in setting session desc')
                        }

                        let webRTCAnswerPayload = {
                            'method': 'webRTCAnswer',
                            sdp: sessionDescription,
                            'senderId': state.user.clientId,
                            'receiverId': data.senderId
                        }
                        console.log('sending answer websocket')
                        dispatch(wsSendMessage(webRTCAnswerPayload))
                    }()
                    break

                case 'webRTCAnswer':
                    connections[data.senderId].setRemoteDescription(data.sdp)
                    break

                case 'sendIceCandidate':
                    let candidate = new RTCIceCandidate({
                        sdpMLineIndex: data.label,
                        candidate: data.candidate
                    })
                    connections[data.senderId].addIceCandidate(candidate)
                    break

                default:
                    console.log('other event:' + data.method)
            }
        }
    }









}

export default eventHandler;