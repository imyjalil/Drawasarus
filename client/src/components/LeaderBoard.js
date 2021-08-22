import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Player from './Player'
import "./LeaderBoard.css"

function LeaderBoard(props) {



    const dispatch = useDispatch()
    const players = useSelector(state => state.game.players)


    const listItems = players.map((player) => <Player key={player.id} id={player.id} name={player.name} points={player.points} />);


    return (
        <div className="leader-board-container">

            <div className="player-details-container">
                {listItems}
            </div>

            <div className="copyCode">
                <input type="button" value="Copy GameCode" onClick={props.copyCode} /> 
            </div>
        </div>
        
    )
}

export default LeaderBoard
