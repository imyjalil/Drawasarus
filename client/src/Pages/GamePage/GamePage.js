import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import LeaderBoard from '../../components/LeaderBoard'
import Canvas from '../../components/canvas'
import Chat from '../../components/Chat/Chat'
import Modal from '../../components/modal'
import './gamePage.css'
import { joinGame } from '../../Redux/actions/userActions'
import { wsSendMessage } from '../../Redux/actions/socketActions'
function GamePage() {


    const dispatch = useDispatch()


    const [loading, setloading] = useState(false)


    useEffect(() => {
        setloading(true)

    }, []);




    let state = useSelector(state => {

        return {
            clientId: state.user.clientId,
            gameId: state.user.gameId,
            name: state.user.name,
        }
    })


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
            <Modal show={false} />
        </div>
    )
}

export default GamePage
