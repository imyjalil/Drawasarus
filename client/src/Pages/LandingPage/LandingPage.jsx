import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { wsConnect, wsSendMessage } from '../../Redux/actions/socketActions';
import { storeName } from '../../Redux/actions/userActions';
import events from '../../utilities/constants'


function LandingPage() {


    console.log("render landing")


    const dispatch = useDispatch()
    const history = useHistory()

    let state = useSelector(state => {

        return {
            clientId: state.user.clientId,
            gameId: state.user.gameId,
            name: state.user.name,
            isClientCreated: state.user.isClientCreated,
            isGameCreated: state.user.isGameCreated
        }
    })


    const createButtonHandler = async () => {

        let name = document.getElementById('name').value
        let clientId, gameId;
        dispatch(storeName(name))

        console.log("create button handler")

        dispatch(wsConnect('ws://localhost:9090/'))

        console.log("after dispatch")

        //console.log(state)

        //load spinner

        //initiate timeout of 5 secs with 0.5s interval, check if client is set
        //if it is, send createpayload
        let attempts = 10
        while (attempts > 0) {

            await new Promise(r => setTimeout(r, 500))
            attempts = attempts - 1
            if (sessionStorage.getItem('clientId') !== null) {
                clientId = sessionStorage.getItem('clientId');
                break
            }
        }

        if (attempts === 0) {
            //display error andd return
            console.log('timeout')
            return
        }
        console.log('ctreatepayload state: ')
        console.log(state)
        let createPayload = {
            'method': events.CREATE_GAME,
            'clientId': clientId,
            'name': name
        }

        dispatch(wsSendMessage(createPayload))

        // console.log(state)

        attempts = 10
        while (attempts > 0) {

            await new Promise(r => setTimeout(r, 500))
            attempts = attempts - 1
            if (sessionStorage.getItem('gameId') !== null) {
                gameId = sessionStorage.getItem('gameId')
                break
            }
        }

        if (attempts === 0) {
            //display error andd return
            console.log('timeout')
            return
        }
        let joinPayload = {
            'method': events.JOIN,
            'gameId': gameId,
            'clientId': clientId,
            'name': name
        }

        dispatch(wsSendMessage(joinPayload))

        history.push("/game/" + gameId)
    }

    return (
        <div className="LandingPage" >
            <input type="text" id="name" defaultValue="karun" /><br></br>
            <input type="button" value="Create" onClick={createButtonHandler} /><br></br>
        </div >
    )
}

export default LandingPage
