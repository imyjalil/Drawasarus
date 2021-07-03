import React from 'react'
import "./Player.css"

function Player(props) {
    return (
        <div class="player">
            <div>{props.name}</div>
            <div>{props.points}</div>
        </div>
    )
}

export default Player
