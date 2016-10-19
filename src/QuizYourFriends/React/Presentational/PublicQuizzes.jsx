var React = require('react');

var PublicQuizzes = React.createClass({
    joinQuiz: function (e) {
        this.props.joinQuiz(e.target.textContent);
    },
    render: function () {
        return (
        <div className="QuizList">
            <h4>Public Quizzes</h4>
            {
            this.props.quizzes != null ?
            <ul>
                {this.props.quizzes.map((quiz, index) =>
                    <li className="Button" onClick={this.joinQuiz} key={quiz.Name + index}>{quiz.Name} <span>{quiz.Count}/{quiz.MaxPlayers}</span></li>
                )}
            </ul>
            :
            <p>none</p>
            }
            <div className="Button" onClick={this.props.refresh}>Refresh</div>
        </div>
      );
    }
});

PublicQuizzes.propTypes = {
    quizzes: React.PropTypes.arrayOf(React.PropTypes.object),
    joinQuiz: React.PropTypes.func,
    refresh: React.PropTypes.func
}

module.exports = PublicQuizzes;