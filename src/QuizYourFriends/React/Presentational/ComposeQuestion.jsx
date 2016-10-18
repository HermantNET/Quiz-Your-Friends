var React = require('react');
var css = require('../../scss/ComposeQuestion.scss');

function ComposeQuestion(props) {
    return (
        <form action="" onSubmit={props.submit} className="ComposeQuestion">
            <label htmlFor="question">Question: </label>
            <textarea name="question" placeholder="Type your question here..." minLength="3" maxLength="140" required />
            <label htmlFor="correct">Correct: </label>
            <input name="correct" type="text" placeholder="Correct answer" maxLength="25" required />
            <label>Wrong Answers: </label>
            <input name="wrong1" type="text" placeholder="Wrong answer" maxLength="25" required />
            <input name="wrong2" type="text" placeholder="Wrong answer" maxLength="25" required />
            <input name="wrong3" type="text" placeholder="Wrong answer" maxLength="25" required />
            <input type="submit" value="Submit" />
        </form>
    );
}

module.exports = ComposeQuestion;