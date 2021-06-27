import React from 'react';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux'
import events from '../utilities/constants'

import initiateWebsocket from '../utilities/socket';
import { createGame, joinGame, storeGameId } from '../Redux/actions/userActions';

function LandingPage(props) {

    console.log("rendering landing page")

    const dispatch = useDispatch()

    const state = useSelector(state => {

        console.log("selector", state)

        return {
            ws: state.user.ws,
            clientId: state.user.clientId,
            gameId: state.user.gameId,
            name: state.user.name
        }
    })


    // const joinGame = async (gameId, clientId, name, ws) => {


    //     let payload = {
    //         'method': events.JOIN,
    //         'gameId': gameId,
    //         'clientId': clientId,
    //         'name': name
    //     }
    //     ws.send(JSON.stringify(payload))
    //     await new Promise(r => setTimeout(r, 500));
    //     console.log('game joined....redirecting to game page')


    //     // this.props.history.push({
    //     //     pathname: "/game/" + gameId,
    //     //     state: {}
    //     // })
    // }


    // const joinButtonHandler = async () => {

    //     let ws = await initiateWebsocket(dispatch)


    //     let name = document.getElementById('name').value
    //     let gameId = document.getElementById('gameId').value


    //     // this.setState({
    //     //     gameId: gameId
    //     // })


    //     await new Promise(r => setTimeout(r, 500));


    //     joinGame(state.gameId, state.clientId, name, state.ws)

    // }

    // const createButtonHandler = async () => {

    //     console.log("start",state)

    //     await initiateWebsocket(dispatch,state)

    //     let name = document.getElementById('name').value

    //     let createPayload = {
    //         'method': events.CREATE_GAME,
    //         'clientId': state.clientId
    //     }

    //     console.log(state)

    //     await new Promise(r => setTimeout(r, 1500));

    //     console.log("after timeout",state)

    //     state.ws.send(JSON.stringify(createPayload))

    //     await new Promise(r => setTimeout(r, 500));


    //     joinGame(state.gameId, state.clientId, state.name, state.ws)
    // }


    return (
        <div className="LandingPage">
            <input type="text" id="name" defaultValue="name" /><br></br>
            <input type="button" value="Create" onClick={() => dispatch(createGame)} /><br></br>
            <input type="button" value="join" onClick={() => dispatch(joinGame)} />
            <input type="text" id="gameId" defaultValue="4" />
        </div>
    )
}




export default withRouter(LandingPage);