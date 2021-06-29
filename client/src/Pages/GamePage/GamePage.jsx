import React from 'react'
import LeaderBoard from '../../components/LeaderBoard'
import Canvas from '../../components/canvas'
import Chat from '../../components/Chat/Chat'
import Modal from '../../components/modal'
import './gamePage.css'
function GamePage() {
    return (
        <div>
            <div className="col-sm-2 leaderBoard" >
                <LeaderBoard />
            </div>
            <div className="col-sm-8 canvas">
                <Canvas />
            </div>
            <div className="col-sm-2 chat" >
                <Chat />
            </div>
            <Modal show={false} />
        </div>
    )
}

export default GamePage
