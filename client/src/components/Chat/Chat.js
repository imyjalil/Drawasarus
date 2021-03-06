import React, { Component, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { wsSendMessage } from '../../Redux/actions/socketActions'
import './Chat.css'
const events = require("../../utilities/constants")

const Chat = () => {
    let [mic, flipMic] = useState(false);

    let dispatch = useDispatch()
    let state = useSelector(state => {
        return {
            clientId: state.user.clientId,
            name: state.user.name,
            gameId: state.user.gameId,
            chatEvent: state.user.chatEvent
        }
    })

    useEffect(() => {
        addChatMessage(state.chatEvent)
    }, [state.chatEvent])

    const sendMessage = (message) => {
        if (message === null) {
            message = document.getElementsByClassName('textContainer')[0].value
        }

        message = message.trim()
        if (message === '') return
        message = {
            'method': events.GUESS,
            'guessWord': message,
            'clientId': state.clientId,
            'name': state.name,
            'gameId': state.gameId
        }

        dispatch(wsSendMessage(message))
        document.getElementsByClassName('textContainer')[0].value = ''
    }

    const addChatMessage = (message) => {
        if (!message) {
            return
        }
        var messageDiv = createMessage(message)
        document.getElementById("chatMessages").innerHTML += messageDiv
        let containerElement = document.getElementById('outerContainer')
        containerElement.scrollTop = containerElement.scrollHeight
    }

    const createMessage = (message) => {
        var isMine = message.clientId === state.clientId
        
        if (message.points) {
            let str = (isMine ? 'You' : message.name) + ' got it right'
            return (`<li class=notif>${str}</li>`)
        }
        var liClassName = isMine ? "mine" : "their"
        let nameElement = '';
        if (!isMine) {
            nameElement = `<span class='senderName'>${(message.name)}</span>`;
        }

        return (`<li class='message ${liClassName}'>
        <div class='messageContainer'>
            ${nameElement}
            <span class='messageBody'>
                ${message.guessWord}
            </span>
        </div>
    </li>`)
    }

    const handleMicFlip = () => {
        flipMic(!mic)
    }

    let micElement = mic ?
        <span className="material-icons micButton"
            onClick={() => handleMicFlip()}>mic</span> :
        <span className="material-icons micButton"
            onClick={() => handleMicFlip()}>mic_off</span>

    return (
        <div className="outerContainer" id="outerContainer">
            <div className="chatContainer">
                <div id="chatMessages" className="chatMessages">
                </div>
            </div>
            <footer>
                <div className="footerContainer">
                    <input className="textContainer"
                        id="textInputContainer"
                        placeholder={'Type a message...'}
                        onKeyPress={(event) => event.key === 'Enter' ? sendMessage(event.target.value) : null}
                    />
                    <i className="material-icons sendButton"
                        onClick={() => sendMessage(null)}>send</i>
                    {micElement}
                </div>
            </footer>
        </div>
    )
}
export default Chat