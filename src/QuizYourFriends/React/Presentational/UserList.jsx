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

module.exports = UserList;