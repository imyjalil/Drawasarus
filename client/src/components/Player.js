import React from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import "./Player.css"

function Player(props) {

    const [mute, setmute] = useState(false)

    let state = useSelector(state => {

        return {
            clientId: state.user.clientId,
            localStream: state.game.localStream

        }
    })

    const inverse = () => {

        // need to get access to the audioEvents in the dom
        // so we can change the volume
        // this is a hack
        const audioEvents = document.getElementById('audioEvents')
        let childNodes = audioEvents.childNodes;

        if (state.clientId == props.id && state.localStream != null) {
            if (mute) {
                state.localStream.getAudioTracks().forEach(track => track.enabled = true)
            }
            else {
                state.localStream.getAudioTracks().forEach(track => track.enabled = false)
            }
            setmute(!mute)
            return;
        }

        // iterate over the child nodes
        childNodes.forEach((child) => {

            // setmute only if the child is the one we are looking for
            if (child.getAttribute("id") == props.id) {
                const remoteStream = child.srcObject
                if (remoteStream != null) {
                    // console.log("tracks", child.srcObject.getAudioTracks())
                    if (mute) {
                        child.srcObject.getAudioTracks().forEach(track => track.enabled = true)
                    }
                    else {
                        child.srcObject.getAudioTracks().forEach(track => track.enabled = false)
                    }
                    setmute(!mute)
                }
            }
        })
    }

    return (
        <div className="player" style={{ color: props.id == state.clientId ? 'black' : '#6a4c93' }}>
            <div>
                {props.name}
            </div>
            <div>
                <span>{props.points}</span>
            </div>
            <div>
                {mute ?
                <span className="material-icons" onClick={inverse}>volume_off</span> :
                <span className="material-icons" onClick={inverse}>volume_up</span>
                }  
            </div>
        </div>
    )
}

export default Player
