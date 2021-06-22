import React, { Component } from 'react';
import './modal.css'
const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? 'modal display-block' : 'modal display-none';

    return (
        <div className={showHideClassName}>
            <section className='modal-main'>
                {children}
                <input type="text" defaultValue="name" id="joinname" />
                <button
                    onClick={handleClose}
                >
                    Close
                </button>
            </section>
        </div>
    );
};
export default Modal