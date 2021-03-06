import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { wsConnect } from '../../Redux/actions/socketActions';
import { createGame, storeName, storeGameId, setCreator } from '../../Redux/actions/userActions';
import axios from 'axios';
import './LandingPage.css'
import config from '../../config'

function LandingPage() {

    const [join, setJoin] = React.useState(false)
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
        dispatch(setCreator())
        dispatch(storeName(document.getElementById('name').value))
        dispatch(createGame())
            .then(path => {
                if (path != '') {
                    dispatch(wsConnect(config.WS_URL))
                    history.push(path)
                }
            })
    }

    const joinButtonHandler = async () => {
        dispatch(storeName(document.getElementById('name').value))
        let gameId = document.getElementById('gameId').value
        let headers = {
            "gameId": gameId
        }
        let resp = await axios.get(config.URL + "isValidGame", { headers })
        
        if (!resp || !resp.data || !resp.data['valid']) {
            alert("Game id is Invalid. Please check again")
            return
        }

        dispatch(storeGameId(gameId))
        dispatch(wsConnect(config.WS_URL))
        history.push('game/' + gameId)
    }

    return (
        <div className="LandingPage" >
            <div className="well">
                <div className="row selectors ">
                    <input type="text" className="create" defaultValue="Create" readOnly onClick={() => { setJoin(false) }}></input>
                    <input type="text" className="join" defaultValue="Join" readOnly onClick={() => { setJoin(true) }}></input>
                </div>

                {join ?
                    <div className="row joinCell">
                        <div className="input-container">

                            <input type="text" id="name" placeholder="Enter Your Name" />
                            <input type="text" id="gameId" placeholder="Enter Game Id" />

                        </div>

                        <div>
                            <input type="button" value="Join" onClick={joinButtonHandler} />
                        </div>
                    </div>

                    :
                    <div className="row createCell">
                        <input type="text" id="name" placeholder="Enter Your Name" />
                        <input type="button" value="Create" onClick={createButtonHandler} />
                    </div>

                }
            </div>
        </div >
    )
}

export default LandingPage
