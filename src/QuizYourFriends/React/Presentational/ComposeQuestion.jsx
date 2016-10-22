var React = require('react');

function ComposeQuestion(props) {
    return (
        <form action="" onSubmit={props.submit} className="ComposeQuestion">
            <p>Questions submitted: {props.questionsSubmitted}</p>
            <label htmlFor="question">Question: </label>
            <textarea name="question" placeholder="Type your question here..." minLength="3" maxLength="360" required autoComplete="off" />
            <label htmlFor="correct">Correct: </label>
            <input name="correct" type="text" placeholder="Correct answer" maxLength="140" required autoComplete="off" />
            <label>Wrong Answers: </label>
            <input name="wrong1" type="text" placeholder="Wrong answer" maxLength="140" required autoComplete="off" />
            <input name="wrong2" type="text" placeholder="Wrong answer" maxLength="140" required autoComplete="off" />
            <input name="wrong3" type="text" placeholder="Wrong answer" maxLength="140" required autoComplete="off" />
            <input type="submit" value="Submit" />
        </form>
    );
}

module.exports = ComposeQuestion;