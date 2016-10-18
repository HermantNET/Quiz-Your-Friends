var React = require('react');

var PublicQuizzes = React.createClass({
    joinQuiz: function (e) {
        this.props.joinQuiz(e.target.textContent);
    },
    render: function () {
        return (
        <div className="QuizList">
            <p>Public Quizzes</p>
            {
            this.props.quizzes != null ?
            <ul>
                {this.props.quizzes.map((quiz, index) =>
                    <li onClick={this.joinQuiz} key={quiz + index}>{quiz}</li>
                )}
            </ul>
            :
            <p>none</p>
            }
            <button onClick={this.props.refresh}>Refresh</button>
        </div>
      );
    }
});

PublicQuizzes.propTypes = {
    quizzes: React.PropTypes.arrayOf(React.PropTypes.string),
    joinQuiz: React.PropTypes.func,
    refresh: React.PropTypes.func
}

module.exports = PublicQuizzes;