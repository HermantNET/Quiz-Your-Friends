var React = require('react');

function UserList(props) {
    return (
        <div className="UserList">
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
    players: React.PropTypes.arrayOf(React.PropTypes.object),
    max: React.PropTypes.number
}

module.exports = UserList;