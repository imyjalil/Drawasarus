import React from 'react'
import { useSelector } from 'react-redux'
import LeaderBoard from '../../components/LeaderBoard'
import Canvas from '../../components/canvas'
import Chat from '../../components/Chat/Chat'
import Modal from '../../components/modal'
import './gamePage.css'
import { joinGame } from '../../Redux/actions/userActions'
function GamePage() {

    let state = useSelector(state => {

        return {
            clientId: state.user.clientId,
            gameId: state.user.gameId,
            name: state.user.name,
        }
    })

    const copy = () => {
        const area = document.getElementsByClassName('gameIdElement')[0]
        area.select();
        document.execCommand('copy')
    }

    return (
        <div className='gamePageContainer'>
            <div className="col-sm-2 leaderBoard" >
                <LeaderBoard />
            </div>
            <div className="col-sm-8 middleContainer">
                <div className="canvas">
                    <Canvas />
                </div>
                <div className="infoContainer">
                    <p>Game Id</p>
                    <div className="gameIdElement">{state.gameId}</div>
                    <span className="material-icons-outlined copyButton" onClick={copy}>content_copy</span>
                </div>
            </div>
            <div className="col-sm-2 chat" >
                <Chat />
            </div>
            <Modal show={false} />
        </div>
    )
}

export default GamePage
