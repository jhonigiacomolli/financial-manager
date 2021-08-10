import './Message.css'
import React from 'react'

function Message(props) {
    return (
        <div className="message-box">
            <i className="fa fa-times close"></i>
            <p className="message">
                Esta é uma mensagem de teste
            </p>
            <div className="actions">
                <button className="action" display={props.display}>{props.buttonValue}</button>
            </div>
        </div>
    )
}

export default Message