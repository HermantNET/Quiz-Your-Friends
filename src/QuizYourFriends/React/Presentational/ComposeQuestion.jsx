var React = require('react');

function ComposeQuestion(props) {
    return (
        <form action="" onSubmit={props.submit}>
            <textarea name="question" placeholder="Type your question here..." minLength="3" maxLength="140" required />
            <input name="correct" type="text" placeholder="Correct answer" maxLength="25" required />
            <input name="wrong1" type="text" placeholder="Wrong answer" maxLength="25" required />
            <input name="wrong2" type="text" placeholder="Wrong answer" maxLength="25" required />
            <input name="wrong3" type="text" placeholder="Wrong answer" maxLength="25" required />
            <input type="submit" value="Submit" />
        </form>
    );
}

module.exports = ComposeQuestion;