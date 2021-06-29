import React, { Component } from 'react';
import Message from '../Messages/Message';
import './Chat.css'


const Chat = () => {
    const sendMessage = (message) => {
        console.log(message)
    }
    return (
        <div className="outerContainer">
            <Message sender="abc" body="xyz" />
            <footer>
                <div className="container">
                    <input
                        placeholder={'Enter message to send'}
                        onKeyPress={(event) => event.key === 'Enter' ? sendMessage(event.target.value) : null}
                    />
                </div>
            </footer>
        </div>
    )
}
export default Chat