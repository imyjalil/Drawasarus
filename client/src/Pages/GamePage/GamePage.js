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
import { resetScores, setSelector, setWordHint } from '../../Redux/actions/gameActions'


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
            name : state.user.name,
            choice: state.game.choice,
            selector: state.game.selector,
            resetGame: state.game.resetGame,
            turnTime: parseInt(state.game.turnTime),
            hint: state.game.hint,
            playerlist: state.game.playerlist
        }
    })

    const [showModal, setModal] = useState(state.isCreator)
    const [wordTimer, setWordTime] = useState(0)
    const [drawTimer, setDrawTime] = useState(0)
    // 

    useEffect(() => {
        if (state.choice !== null) {
            setModal(true)
            dispatch(setSelector({'name':state.name,'time':0}))
            console.log(state.choice)
            let time = state.turnTime
            setChildrenContent(<div>
                <div className="headerContainer">
                    <span id="wordSelectionText">Choose a Word</span>
                    <span id="time">{time}</span>
                </div>
                <div className="buttonContainer">
                    {state.choice.map((word) => {
                        return <button key={word} className="selectionButton" onClick={() => { handleChoiceSelection(word) }}>{word}</button>
                    })}
                </div>
            </div>)
            let timer = setInterval(function(){
                if(time<=1){
                    clearTimeout(timer)
                }
                else{
                    time--;
               //document.getElementById("time").innerHTML=time
                }
            },1000)
        }
    }, [state.choice])

    // wait trigger
    useEffect(() => {

        if (state.selector !== null && state.selector != state.name) {
            flipDrawState(false)
            setModal(true)
            let time=state.turnTime
            setChildrenContent(<div className="headerContainer">
                <span id="wordSelectionText">Please wait {state.selector} is choosing a word</span>
                <span id="time"></span>
            </div>)
            let timer = setInterval(function(){
                if(time<=1){
                    clearTimeout(timer)
                }
                else{
                    time--;
                    console.log("In timer",showModal);
                  //  document.getElementById("time").innerHTML=time
                }
            },1000)
        }
    }, [state.selector])

    useEffect(() => {
        if (state.gameId === null) {
            moveToHomePage()
        }
    }, [state.gameId])

    useEffect(() => {

        if(state.resetGame == true)
        {
            dispatch(resetScores(false));
            setModal(false);

            console.log()
        }
    }, [state.resetGame])


    useEffect(() => {
        setChildrenContent(<div>
            <div>
                Set Timeout for Drawing:
                <select id="turnTimer">
                    <option value="40">40</option>
                    <option value="45">45</option>
                    <option value="50">50</option>
                    <option value="55">55</option>
                    <option value="60">60</option>
                    <option value="65">65</option>
                    <option value="70">70</option>
                    <option value="75">75</option>
                    <option value="80">80</option>
                    <option value="85">85</option>
                </select>
            </div>
            <div>
                Set Timeout for Word Selection:
                <select id="selectionTimer">
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                    <option value="30">30</option>
                    <option value="35">35</option>
                    <option value="40">40</option>
                </select>
            </div>
            Click here to copy the game code
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

    const restart = () => {
        console.log("restart");
        setModal(false);
        var payload = {
            'method':events.START_GAME,
            'gameId':state.gameId
        }
        dispatch(wsSendMessage(payload))
    }

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
                {state.isCreator && <button onClick = {() => {restart()}}>Play again</button>}
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
        var selectionTimerSelected=document.getElementById('selectionTimer')
        var turnTimerSelected=document.getElementById('turnTimer')
        let wordTime = selectionTimerSelected.options[selectionTimerSelected.selectedIndex].value
        let drawTime = turnTimerSelected.options[turnTimerSelected.selectedIndex].value
        let startGamePayload = {
            'method': events.START_GAME,
            'gameTimer':drawTime,
            'turnTimer':wordTime,
            gameId: state.gameId
        }
        setWordTime(wordTime)
        setDrawTime(drawTime)
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
