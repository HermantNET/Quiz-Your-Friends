var React = require('react');

function QuizEnd(props) {
    return (
      <div>
          <p>{props.players[0].Score == props.players[1].Score ? "Tie!" : props.players[0].Name + " wins!"}</p>
          <ul>
              {props.players.map((player) => { return <li>{player.Name} <span>{player.Score}</span></li> })}
          </ul>
      </div>  
    );
}

module.exports = QuizEnd;