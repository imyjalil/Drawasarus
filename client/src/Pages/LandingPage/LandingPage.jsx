import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { wsConnect } from '../../Redux/actions/socketActions';
import { createGame, joinGame } from '../../Redux/actions/userActions';



function LandingPage() {

    const dispatch = useDispatch()

    const createButtonHandler = () => {

        let name = document.getElementById('name').value

        console.log("create button handler")

        dispatch(wsConnect('ws://localhost:9090/'))

        console.log("after dispatch")

        // problem we dont have client id

        let createPayload = {
            'method': events.CREATE_GAME,
            'clientId': 10
        }

        // console.log(state)


        // console.log("after timeout", state)

        // state.ws.send(JSON.stringify(createPayload))

        // joinGame(state.gameId, state.clientId, state.name, state.ws)
    }



    return (
        <div className="LandingPage" >
            <input type="text" id="name" defaultValue="karun" /><br></br>
            <input type="button" value="Create" onClick={createButtonHandler} /><br></br>
        </div >


    )


}

export default LandingPage
