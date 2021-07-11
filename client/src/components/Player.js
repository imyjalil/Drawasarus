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
                <span className="material-icons" onClick={inverse}>volume_off</span> :
                <span className="material-icons" onClick={inverse}>volume_up</span>
            }


        </div>
    )
}

export default Player
