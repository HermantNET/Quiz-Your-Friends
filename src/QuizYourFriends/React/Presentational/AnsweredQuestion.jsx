var React = require('react');

function AnsweredQuestion(props) {
    return (
        <div>
            <h4>{props.isRight ? "Correct!" : "Wrong."}</h4>
            <p>{props.correct}</p>
        </div>
    );
}

module.exports = AnsweredQuestion;