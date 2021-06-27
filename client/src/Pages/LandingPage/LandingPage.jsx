import React, { Component } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { wsConnect, wsSendMessage } from '../../Redux/actions/socketActions';
import { storeName } from '../../Redux/actions/userActions';
import events from '../../utilities/constants'


class LandingPage extends Component {

    constructor(props) {
        super(props)
        console.log("render landing")
        // this.state = props
        // console.log(this.state)
        // console.log(this.state.clientId)
        this.propObj = { ...props }
    }

    componentDidUpdate() {
        console.log("compoent updated Landing Page")
    }

    createButtonHandler = async () => {

        let name = document.getElementById('name').value

        storeName(name)

        console.log("create button handler")

        wsConnect('ws://localhost:9090/')

        console.log("after dispatch")
        console.log(this.props)
        //console.log(state)

        //load spinner

        //initiate timeout of 5 secs with 0.5s interval, check if client is set
        //if it is, send createpayload
        let attempts = 10
        while (attempts > 0) {

            await new Promise(r => setTimeout(r, 500))
            attempts = attempts - 1
            if (this.props.isClientCreated === true) {
                console.log('client id created')
                break
            }
        }

        if (attempts === 0) {
            //display error andd return
            console.log('timeout')
            return
        }
        console.log('ctreatepayload state: ')
        console.log(this.props)
        let createPayload = {
            'method': events.CREATE_GAME,
            'clientId': this.propObj.user.clientId,
            'name': this.propObj.user.name
        }

        wsSendMessage(createPayload)

        // console.log(state)

        attempts = 10
        while (attempts > 0) {

            await new Promise(r => setTimeout(r, 500))
            attempts = attempts - 1
            if (this.propObj.user.isGameCreated === true) {
                console.log('game id created')
                break
            }
        }

        if (attempts === 0) {
            //display error andd return
            console.log('timeout')
            return
        }
        console.log('joinpayload state: ')
        console.log(this.propObj)
        let joinPayload = {
            'method': events.JOIN,
            'gameId': this.propObj.user.gameId,
            'clientId': this.propObj.user.clientId,
            'name': this.propObj.user.name
        }

        wsSendMessage(joinPayload)

        //history.push("/game/" + this.state.gameId)
    }

    render() {
        return (
            <div className="LandingPage" >
                <input type="text" id="name" defaultValue="karun" /><br></br>
                <input type="button" value="Create" onClick={this.createButtonHandler} /><br></br>
            </div >
        )
    }
}

const mapStateToProps = (state) => {
    let newState = { ...state }
    let user = { ...newState.user }
    return {
        clientId: user.clientId,
        gameId: user.gameId,
        name: user.name,
        isClientCreated: user.isClientCreated,
        isGameCreated: user.isGameCreated
    }
}

const mapDispatchToProps = dispatch => {
    return {
        storeName: (name) => dispatch(storeName(name)),
        wsSendMessage: (msg) => dispatch(wsSendMessage(msg))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage)

