import React, { useEffect } from 'react'
import LeaderBoard from '../../components/LeaderBoard'
import Canvas from '../../components/canvas'
import Chat from '../../components/Chat/Chat'
import Modal from '../../components/modal'
import './gamePage.css'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

function GamePage() {
    let history = useHistory()
    let state = useSelector(state => {

        return {
            gameId: state.user.gameId
        }
    })
    useEffect(() => {
        if (state.gameId === null) {
            history.push('/')
        }
    }, [state.gameId])

    return (
        <div className='gamePageContainer'>
            <div className="col-sm-2 leaderBoard" >
                <LeaderBoard />
            </div>
            <div className="col-sm-8 canvas">
                <Canvas />
            </div>
            <div className="col-sm-2 chat" >
                <Chat />
            </div>
            <div id="audioEvents">

            </div>
            <Modal show={false} />
        </div>
    )
}

export default GamePage
