import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { wsConnect, wsSendMessage } from '../../Redux/actions/socketActions';
import { createGame, storeName, storeGameId } from '../../Redux/actions/userActions';
import events from '../../utilities/constants'
import axios from 'axios';

const PORT = process.env.PORT || 9091
const webSocketURL = 'ws://localhost:' + PORT + '/'
const serverURL = "http://localhost:" + PORT + "/"
function LandingPage() {


    //console.log("render landing")


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
        dispatch(storeName(document.getElementById('name').value))
        dispatch(createGame("helloroom"))
            .then(path => {
                if (path != '') {
                    // if we got a valid room id

                    dispatch(wsConnect(webSocketURL))
                    console.log(path)
                    history.push(path)
                }
            })
    }

    const joinButtonHandler = async () => {

        dispatch(storeName(document.getElementById('name').value))
        // api to check if the gameid exists
        let gameId = document.getElementById('gameId').value
        let headers = {
            "gameId": gameId
        }
        let resp = await axios.get(serverURL + "isValidGame", { headers })
        console.log(resp.data)
        if (!resp || !resp.data || !resp.data['valid']) {
            alert("Game id is Invalid. Please check again")
            return
        }

        dispatch(storeGameId(gameId))
        dispatch(wsConnect(webSocketURL))
        history.push('game/' + gameId)
    }


    return (
        <div className="LandingPage" >
            <h1>{state.clientId}</h1>
            <input type="text" id="name" defaultValue="abc" /><br></br>
            <input type="button" value="Create" onClick={createButtonHandler} /><br></br>
            <input type="text" id="gameId" /><br></br>
            <input type="button" value="Join" onClick={joinButtonHandler} />
        </div >
    )
}

export default LandingPage
