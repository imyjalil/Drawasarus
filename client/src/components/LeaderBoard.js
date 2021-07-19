import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Player from './Player'
import "./LeaderBoard.css"

function LeaderBoard() {





    const dispatch = useDispatch()
    const players = useSelector(state => state.game.players)


    const listItems = players.map((player) => <Player key={player.id} id={player.id} name={player.name} points={player.points} />);


    return (
        <div className="leader-board-container">
            {listItems}
        </div>
    )
}

export default LeaderBoard
