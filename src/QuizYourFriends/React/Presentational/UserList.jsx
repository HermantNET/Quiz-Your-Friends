var React = require('react');

function UserList(props) {
    return (
        <ul>
            {props.players.map((player, index) => {
                return <li key={'player'+index}>{player.Name} <span>{player.Score}</span></li>
            })}
        </ul>
    );
}

module.exports = UserList;