import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { wsConnect, wsSendMessage } from '../../Redux/actions/socketActions';
import { createGame, storeName, storeGameId } from '../../Redux/actions/userActions';
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


    const createButtonHandler = () => {
        // first send a get request to create game
        // store the gameid and client id redux thunk

        dispatch(createGame("helloroom"))
            .then(path => {
                if (path != '') {
                    // if we got a valid room id
                    dispatch(wsConnect('ws://localhost:9091/'))
                    console.log(path)
                    history.push(path)
                }
            })
    }

    const joinButtonHandler = () => {

        // need to raise a alert when user didn't entered the game code

        // 1234 is for default test game code
        dispatch(storeGameId('1234'))
        dispatch(wsConnect('ws://localhost:9091/'))
        history.push('game/1234')
    }


    return (
        <div className="LandingPage" >
            <h1>{state.clientId}</h1>
            <input type="text" id="name" defaultValue="karun" /><br></br>
            <input type="button" value="Join" onClick={joinButtonHandler} />
            <input type="text" id="name" defaultValue="1234" /><br></br>
            <input type="button" value="Create" onClick={createButtonHandler} /><br></br>
        </div >
    )
}

export default LandingPage
