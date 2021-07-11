import React from 'react'
import { useState } from 'react'
import "./Player.css"

function Player(props) {


    const [mute, setmute] = useState(false)



    const inverse = () => {
        setmute(!mute)
    }


    return (
        <div className="player">
            <div>{props.name}</div>
            <div>{props.points}</div>

            {mute ?
                <span class="material-icons-outlined" onClick={inverse}>mute</span> :
                <span className="material-icons-outlined" onClick={inverse}> unmute</span>
            }


        </div>
    )
}

export default Player
