var React = require('react');

function QuizEnd(props) {
    return (
      <div>
          <p>
              {
                props.players.length > 1 ?
                (props.players[0].Score == props.players[1].Score ? "Tie!" : props.players[0].Name + " wins!")
                :
                props.players[0].Name + " is the only one left :("
              }
          </p>
          <ul>
              {props.players.map((player, index) => {
                  return
              <li key={"scoreboard" + index }>{player.Name} <span>{player.Score}</span></li>
              })}
          </ul>
          <button onClick={props.playAgain}>Play Again</button>
      </div>
    );
}

module.exports = QuizEnd;