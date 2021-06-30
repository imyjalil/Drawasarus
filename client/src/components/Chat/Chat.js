import React, { Component } from 'react';
import './Chat.css'


const Chat = () => {
    const sendMessage = (message) => {
        if (message === null) {
            message = document.getElementsByClassName('textContainer')[0].value
        }
        message = {
            body: message.trim(),
            sender: 'their'
        }
        addChatMessage(message)
        //console.log(message)
    }
    let messages = []

    const addChatMessage = (message) => {
        if (!message) {
            alert("Invalid message")
            return
        }
        var messageDiv = createMessage(message)
        document.getElementById("chatMessages").innerHTML += messageDiv
        let containerElement = document.getElementById('outerContainer')
        containerElement.scrollTop = containerElement.scrollHeight
    }

    const createMessage = (message) => {
        var isMine = message.sender === 'self'//need to change this to id later
        var liClassName = isMine ? "mine" : "their"
        // liClassName = "message ".concat(liClassName)
        return (`<li class='message ${liClassName}'>
        <div class='messageContainer'>
            <span class='messageBody'>
                ${message.body}
            </span>
        </div>
    </li>`)
    }

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
                </div>
            </footer>
        </div>
    )
}
export default Chat