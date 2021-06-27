import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { wsConnect } from '../../Redux/actions/socketActions';
import { createGame, joinGame, storeName } from '../../Redux/actions/userActions';


function LandingPage() {


    console.log("render landing")


    const dispatch = useDispatch()
    const history = useHistory()

    const state = useSelector(state => {

        console.log("selector", state)

        return {
            clientId: state.user.clientId,
            gameId: state.user.gameId,
            name: state.user.name
        }
    })


    const createButtonHandler = () => {

        let name = document.getElementById('name').value

        dispatch(storeName(name))

        console.log("create button handler")

        dispatch(wsConnect('ws://localhost:9090/'))

        console.log("after dispatch")

        console.log(state)

        history.push("/game/2")

        // problem we dont have client id

        // let createPayload = {
        //     'method': events.CREATE_GAME,
        //     'clientId': 10
        // }

        // dispatch(ws)

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
