import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Player from './Player'
import "./LeaderBoard.css"

function LeaderBoard() {

    const dispatch = useDispatch()
    const players = useSelector(state => state.game.players)

    // const listItems = players.map((d) => <li key={d.id}>{d.name} {d.points}</li>);

    const listItems = players.map((d) => <Player name={d.name} points={d.points} />);


    return (
        <div class="leader-board-container">
            {listItems}
        </div>
    )
}

export default LeaderBoard
