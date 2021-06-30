import React, { Component } from 'react';
import Message from '../Messages/Message';
import './Chat.css'


const Chat = () => {
    const sendMessage = (message) => {
        if (message === null) {
            message = document.getElementsByClassName('textContainer')[0].value
        }
        console.log(message)
    }
    return (
        <div className="outerContainer">
            <div className="chatMessages">
                {/*<Message sender="abc" body="xyz" />*/}
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