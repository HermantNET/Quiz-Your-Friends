var React = require('react');
var css = require('../../scss/UserList.scss');

function UserList(props) {
    return (
        <div className="UserList">
            <p>Players in lobby: <span className="Heavy">{props.players.length}/{props.max}</span></p>
            <ul>
                {props.players.map((player, index) => {
                    return <li key={'player'+index}><span>{player.Name}</span><span>{player.Score}</span></li>
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