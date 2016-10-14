var React = require('react');

function UserList(props) {
    return (
        <div>
            <p>Players in lobby: {props.players.length}/{props.max}</p>
            <ul>
                {props.players.map((player, index) => {
                    return <li key={'player'+index}>{player.Name} <span>{player.Score}</span></li>
                })}
            </ul>
        </div> 
    );
}

UserList.propTypes = {
    players: React.PropTypes.arrayOf(React.PropTypes.objectOf(React.PropTypes.string, React.PropTypes.number)),
    max: React.PropTypes.number
}

module.exports = UserList;