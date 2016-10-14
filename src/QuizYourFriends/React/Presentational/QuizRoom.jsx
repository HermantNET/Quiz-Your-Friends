var React = require('react');

function QuizRoom(props) {
    return (
    <div>
        <p>Players ready: {props.ready}/{props.playerCount}</p>
        <p>Waiting for everyone to 'Ready Up'</p>
    </div>
    );
}

QuizRoom.PropTypes = {
    ready: React.PropTypes.number,
    playerCount: React.PropTypes.number
}

module.exports = QuizRoom;