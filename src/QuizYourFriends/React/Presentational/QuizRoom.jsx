var React = require('react');

function QuizRoom(props) {
    return (
    <div className="QuizRoom">
        <p>Players ready: {props.ready}/{props.playerCount}</p>
        <p>Waiting for everyone to 'Ready Up'</p>
    </div>
    );
}

QuizRoom.propTypes = {
    ready: React.PropTypes.number,
    playerCount: React.PropTypes.number
}

module.exports = QuizRoom;