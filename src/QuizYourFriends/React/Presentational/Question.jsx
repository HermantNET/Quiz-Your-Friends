var React = require('react');

function Question(props) {
    return (
        <div>
            <p>{props.question}</p>
            <ul>
                {props.answers.map((answer, index) =>
                <li key={"answer"+index}>{answer}</li>)}
            </ul>
        </div>
    );
}

module.exports = Question;