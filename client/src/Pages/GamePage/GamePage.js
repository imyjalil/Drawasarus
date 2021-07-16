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

    let [childrenContent, setChildrenContent] = useState(null)
    let [canDraw, flipDrawState] = useState(false)
    let state = useSelector(state => {

        return {
            gameId: state.user.gameId,
            clientId: state.user.clientId,
            isCreator: state.user.isCreator,
            choice: state.game.choice,
            selector: state.game.selector,
            hint: state.game.hint
        }
    })

    const [showModal, setModal] = useState(state.isCreator)


    useEffect(() => {
        console.log('choice use effect')
        if (state.choice !== null) {
            console.log('seeting modal to true')
            setModal(true)
            console.log(state.choice)

            setChildrenContent(<div>
                <p>choose a word</p>
                {state.choice.map((word) => {
                    return <button key={word} onClick={() => { handleChoiceSelection(word) }}>{word}</button>
                })}
            </div>)
            console.log('showModal before:', showModal)

        }

    }, [state.choice])

    useEffect(() => {
        console.log('selector use effect')
        if (state.selector !== null) {
            flipDrawState(false)
            console.log('seeting modal to true')
            setModal(true)
            setChildrenContent(<div>
                <p>Please wait {state.selector} is choosing a word</p>
            </div>)
            console.log('showModal:', showModal)
        }
    }, [state.selector])

    useEffect(() => {
        if (state.gameId === null) {
            history.push('/')
        }
    }, [state.gameId])

    useEffect(() => {
        console.log('basic use effect showModal:', showModal)
        setChildrenContent(<div>Click here to copy the game code
            <span className="material-icons copyButton" onClick={copyGameCode}>content_copy</span>
            <button onClick={handleStartGameClose}>Start Game!</button></div>)
    }, [])

    useEffect(() => {
        if (state.hint !== null) {
            console.log('hint:', state.hint)
            setModal(false)
        }
    }, [state.hint])

    function handleChoiceSelection(word) {
        let choicePayload = {
            'method': 'choice',
            'word': word,
            'clientId': state.clientId,
            'gameId': state.gameId
        }
        console.log('handleChoiceSelection setting modal to false')
        setModal(false)
        dispatch(wsSendMessage(choicePayload))
        flipDrawState(true)
    }

    function handleStartGameClose() {
        let startGamePayload = {
            'method': events.START_GAME,
            gameId: state.gameId
        }
        console.log('handleStartGameClose setting modal to false')
        setModal(false)
        dispatch(wsSendMessage(startGamePayload))


    }

    function copyGameCode() {
        const gameCode = window.location.pathname.split("/")[2]
        console.log(gameCode)
        navigator.clipboard.writeText(gameCode)
    }



    return (
        <div className='gamePageContainer'>
            <div className="col-sm-2 leaderBoard" >
                <LeaderBoard />
            </div>
            <div className="col-sm-8 canvas">
                <Canvas canDraw={canDraw} />
            </div>
            <div className="col-sm-2 chat" >
                <Chat />
            </div>
            <div id="audioEvents">

            </div>
            <Modal id="modal" show={showModal} children={childrenContent} />
        </div>
    )
}

export default GamePage
