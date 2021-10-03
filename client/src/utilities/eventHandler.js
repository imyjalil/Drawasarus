import { storeClientId, storeGameId } from '../Redux/actions/userActions';
import { resetScores,remoteCords,removePlayer, signalChatEvent, updatePoints, updatePlayerList, draw, setChoice, setSelector, setWordHint, endGame, setLocalStream } from '../Redux/actions/gameActions';
import { wsSendMessage } from '../Redux/actions/socketActions';
import events from './constants';

let localStream;
let connections = {};
let remoteStreams = {};

const mediaConstraints = {
    audio: true,
    video: false
}

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
    localStream.getTracks().forEach((track) => {
        rtcPeerConnection.addTrack(track, localStream)
    })
}

const eventHandler = async (event, dispatch, state) => {

    if (event && event.data) {
        let data = JSON.parse(event.data)

        if (data && data.method) {

            switch (data.method) {

                case events.CONNECT:
                    let clientId = data.clientId;
                    dispatch(storeClientId(clientId))

                    let joinPayload = {
                        'method': events.JOIN_GAME,
                        'clientId': clientId,
                        'gameId': state.user.gameId,
                        'name': state.user.name
                    }

                    dispatch(wsSendMessage(joinPayload))

                    localStream = await navigator.mediaDevices.getUserMedia(mediaConstraints)
                    dispatch(setLocalStream(localStream))
                    
                    

                    break;

                case events.CREATE_GAME:
                    let gameId = data.gameId
                    dispatch(storeGameId(gameId))
                    sessionStorage.setItem('gameId', gameId);
                    break;

                case events.JOIN_GAME:
                    let otherUser = data.name
                    break;
                
                case events.DRAW_LINES:
                    
                    sessionStorage.setItem("currentState", JSON.stringify(data.lines))
                    break;

                case events.TURN:
                    dispatch(setChoice(data))
                    break

                case events.WAIT:
                    dispatch(setSelector(data))
                    break

                case events.WORD_SELECT:
                    dispatch(setWordHint(data))
                    break

                case events.GUESS:

                    // if the data has points the update the player list
                    if (data.points != 0) {
                        dispatch(updatePoints(data.points, data.clientId))
                    }
                    dispatch(signalChatEvent(data))
                    break;
                case events.RESET:
                    dispatch(resetScores(true))
                    break;
                case events.DRAW:
                    dispatch(draw(data))
                    break;

                case events.SET_REMOTE_CORDS:
                    dispatch(remoteCords(data))
                    break;

                case events.PREV_CLIENTS:
                    let prevClients = data.clients
                    while (localStream == null || localStream == undefined) {
                        await new Promise(r => setTimeout(r, 100));
                    }
                    for (let player of prevClients) {
                        let rtcPeerConnection = new RTCPeerConnection(iceServers)
                        connections[player] = rtcPeerConnection
                        addLocalTracks(rtcPeerConnection)

                        rtcPeerConnection.ontrack = (event) => {
                            //create an audio element and attach stream to it
                            let audioElement = document.createElement("video")
                            audioElement.autoplay = "autoplay"
                            audioElement.srcObject = event.streams[0]
                            audioElement.setAttribute("id", player)
                            document.getElementById('audioEvents').appendChild(audioElement)
                            remoteStreams[player] = event.streams[0]
                        }
                        rtcPeerConnection.onicecandidate = (event) => {
                            if (event.candidate) {
                                let iceCandidatePayload = {
                                    'method': events.SEND_ICE_CANDIDATE,
                                    'senderId': state.user.clientId,
                                    'receiverId': player,
                                    label: event.candidate.sdpMLineIndex,
                                    candidate: event.candidate.candidate
                                }
                                dispatch(wsSendMessage(iceCandidatePayload))
                            }
                        }
                        
                        let offercreation = await async function () {
                            let sessionDescription
                            try {
                                sessionDescription = await rtcPeerConnection.createOffer()
                                rtcPeerConnection.setLocalDescription(sessionDescription)
                            } catch (error) {
                                console.log('error in setting session desc')
                            }

                            let webRTCOfferPayload = {
                                'method': events.WEBRTC_OFFER,
                                sdp: sessionDescription,
                                'senderId': state.user.clientId,
                                'receiverId': player
                            }
                            dispatch(wsSendMessage(webRTCOfferPayload))
                        }()
                    }
                    break

                case events.UPDATE_PLAYER_LIST:
                    dispatch(updatePlayerList(data))
                    break

                case events.REMOVE_PLAYER:
                    dispatch(removePlayer(data.id))
                    break;

                case events.END_GAME:
                    dispatch(endGame(data.playerlist))
                    break;

                case events.WEBRTC_OFFER:
                    let rtcPeerConnection = new RTCPeerConnection(iceServers)
                    connections[data.senderId] = rtcPeerConnection
                    addLocalTracks(rtcPeerConnection)

                    rtcPeerConnection.ontrack = (event) => {
                        //create an audio element and attach stream to it
                        let audioElement = document.createElement("video")
                        audioElement.autoplay = "autoplay"
                        audioElement.srcObject = event.streams[0]
                        audioElement.setAttribute("id", data.senderId)
                        document.getElementById('audioEvents').appendChild(audioElement)
                        remoteStreams[data.senderId] = event.streams[0]
                    }

                    rtcPeerConnection.onicecandidate = (event) => {
                        if (event.candidate) {
                            let iceCandidatePayload = {
                                'method': events.SEND_ICE_CANDIDATE,
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
                        let sessionDescription
                        try {
                            sessionDescription = await rtcPeerConnection.createAnswer()
                            rtcPeerConnection.setLocalDescription(sessionDescription)
                            
                        } catch (error) {
                            console.log('error in setting session desc')
                        }

                        let webRTCAnswerPayload = {
                            'method': events.WEBRTC_ANSWER,
                            sdp: sessionDescription,
                            'senderId': state.user.clientId,
                            'receiverId': data.senderId
                        }
                        dispatch(wsSendMessage(webRTCAnswerPayload))
                    }()
                    break

                case events.WEBRTC_ANSWER:
                    connections[data.senderId].setRemoteDescription(data.sdp)
                    break

                case events.SEND_ICE_CANDIDATE:
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