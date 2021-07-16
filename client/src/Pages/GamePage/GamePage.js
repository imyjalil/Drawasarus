import React, { useEffect, useState } from 'react'
import LeaderBoard from '../../components/LeaderBoard'
import Canvas from '../../components/canvas'
import Chat from '../../components/Chat/Chat'
import Modal from '../../components/modal'
import './gamePage.css'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import events from '../../utilities/constants'
import { wsSendMessage } from '../../Redux/actions/socketActions'

function GamePage() {
    let history = useHistory()
    let dispatch = useDispatch()
    let state = useSelector(state => {

        return {
            gameId: state.user.gameId,
            isCreator: state.user.isCreator
        }
    })

    useEffect(() => {
        if (state.gameId === null) {
            history.push('/')
        }
    }, [state.gameId])

    const [showModal, setModal] = useState(state.isCreator)
    function handleStartGameClose() {
        let startGamePayload = {
            'method': events.START_GAME,
            gameId: state.gameId
        }
        dispatch(wsSendMessage(startGamePayload))
        setModal(false)
    }

    function copyGameCode() {
        const gameCode = window.location.pathname.split("/")[2]
        console.log(gameCode)
        navigator.clipboard.writeText(gameCode)
    }

    let startGameModalContent = (<div>Click here to copy the game code
        <span className="material-icons copyButton" onClick={copyGameCode}>content_copy</span>
        <button onClick={handleStartGameClose}>Start Game!</button></div>)
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
            <Modal show={showModal} children={startGameModalContent} />
        </div>
    )
}

export default GamePage
