var React = require('react');

function QuizRoom(props) {
    return (
    <div className="QuizRoom">
        <p>Players ready: <span className="Heavy">{props.ready}/{props.playerCount}</span></p>
        <p>Waiting for everyone to 'Ready Up'</p>
    </div>
    );
}

QuizRoom.propTypes = {
    ready: React.PropTypes.number,
    playerCount: React.PropTypes.number
}

module.exports = QuizRoom;