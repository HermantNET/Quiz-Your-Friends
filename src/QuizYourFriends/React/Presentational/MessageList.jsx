var React = require('react');

function MessageList(props) {
    return (
        <ul>
            {props.messages.map((msg, index) => {
                return <li key={'msg'+index}>{msg}</li>
            })}
        </ul>
        );
}

module.exports = MessageList;