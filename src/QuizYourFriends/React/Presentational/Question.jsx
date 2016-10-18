var React = require('react');

function Question(props) {
    return (
        <div>
            <p>{props.question}</p>
            {props.answers.map((answer, index) =>
                <div className="Button" key={"answer"+index} onClick={props.submitAnswer}>
                    {answer}
                </div>
            )}
        </div>
    );
}

module.exports = Question;