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
import { setWordHint } from '../../Redux/actions/gameActions'

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
            hint: state.game.hint,
            playerlist: state.game.playerlist
        }
    })

    const [showModal, setModal] = useState(state.isCreator)


    useEffect(() => {
        if (state.choice !== null) {
            setModal(true)
            console.log(state.choice)

            setChildrenContent(<div>
                <p>choose a word</p>
                {state.choice.map((word) => {
                    return <button key={word} onClick={() => { handleChoiceSelection(word) }}>{word}</button>
                })}
            </div>)
        }
    }, [state.choice])

    useEffect(() => {
        if (state.selector !== null) {
            dispatch(setWordHint(null))
            flipDrawState(false)
            setModal(true)
            setChildrenContent(<div>
                <p>Please wait {state.selector} is choosing a word</p>
            </div>)
        }
    }, [state.selector])

    useEffect(() => {
        if (state.gameId === null) {
            moveToHomePage()
        }
    }, [state.gameId])

    useEffect(() => {
        setChildrenContent(<div>Click here to copy the game code
            <span className="material-icons copyButton" onClick={copyGameCode}>content_copy</span>
            <button onClick={handleStartGameClose}>Start Game!</button></div>)
    }, [])

    useEffect(() => {
        console.log('hint useeffect')
        if (state.hint !== null) {
            console.log('hint:', state.hint)
            setModal(false)
        }
    }, [state.hint])

    useEffect(() => {
        if (state.playerlist !== null) {
            let playerlist = state.playerlist
            playerlist.sort((a, b) => (a.points > b.points) ? -1 : 1)
            console.log('playlist')
            console.log(playerlist)
            console.log(typeof playerlist)
            setModal(true)
            setChildrenContent(<div>
                <p>Leader Board</p>
                {state.playerlist.map((entry) => {
                    return (<div key={entry.id}>
                        <p>{entry.name}</p>
                        <p>{entry.points}</p>
                    </div>)
                })}
                <p>Game Ended!!!</p>
            </div>)

        }
    }, [state.playerlist])

    function moveToHomePage() {
        history.push('/')
    }

    function handleChoiceSelection(word) {
        let choicePayload = {
            'method': 'choice',
            'word': word,
            'clientId': state.clientId,
            'gameId': state.gameId
        }
        setModal(false)
        dispatch(wsSendMessage(choicePayload))
        flipDrawState(true)
    }

    function handleStartGameClose() {
        let startGamePayload = {
            'method': events.START_GAME,
            gameId: state.gameId
        }
        setModal(false)
        dispatch(wsSendMessage(startGamePayload))


    }

    function copyGameCode() {
        const gameCode = window.location.pathname.split("/")[2]
        console.log(gameCode)
        navigator.clipboard.writeText(gameCode)
    }



    return (
        <div className="gamePageContainer">


            <div className="leaderBoard">
                <LeaderBoard  copyCode = {copyGameCode} />
            </div>
            <div className ="canvas">
                <Canvas canDraw={canDraw} />
            </div>
            <div className = "chatBox">
                <Chat />
            </div>

            <div id="audioEvents">
            </div>

            <Modal id="modal" show={showModal} children={childrenContent} />

        </div>
    )
}

export default GamePage
