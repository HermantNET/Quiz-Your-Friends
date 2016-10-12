var React = require('react');

function MessageList(props) {
    return (
        <ul>
            {props.messages.map((msg) => {
                return <li>{msg}</li>
            })}
        </ul>
        );
}

module.exports = MessageList;