import React, { Component } from 'react';
import './Message.css';

const Message = (message) => {
    return (
        <div className="messageContainer">
            <div className={message.sender === "self" ? "Mine" : "Their"}>
                {message.sender === "self" ? "" : message.sender}
            </div>
            <div class="message">
                {message.body}
            </div>
        </div>
    )
}

export default Message