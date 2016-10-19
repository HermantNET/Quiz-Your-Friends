var React = require('react');

function QuizEnd(props) {
    return (
      <div className="QuizEnd">
          <p>
              {
                props.players.length > 1 ?
                (props.players[0].Score == props.players[1].Score ? "Tie!" : props.players[0].Name + " wins!")
                :
                props.players[0].Name + " is the only one left :("
              }
          </p>
          <ul>
              {props.players.map((pl, index) => {
                  return <li key={"scoreboard" + index}>{pl.Name} <span className="PlayerScore">{pl.Score}</span></li>
              })}
          </ul>
          <button onClick={props.playAgain}>Play Again</button>
      </div>
    );
}

module.exports = QuizEnd;