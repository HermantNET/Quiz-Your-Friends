var React = require('react');

function Question(props) {
    return (
        <div>
            <p>{props.question}</p>
            {props.answers.map((answer, index) =>
                <button key={"answer"+index} onClick={props.chooseAnswer}>
                    {answer}
                </button>
            )}
        </div>
    );
}

module.exports = Question;