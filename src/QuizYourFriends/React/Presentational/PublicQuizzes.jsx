var React = require('react');

var PublicQuizzes = React.createClass({
    render: function () {
        return (
        <div className="QuizList">
            <h4>Public Quizzes</h4>
            {
            this.props.quizzes != null ?
            <ul className="PublicQuizList">
                {this.props.quizzes.map((quiz, index) =>
                    <li className="Button" onClick={() => this.props.joinQuiz(quiz.Name)} key={quiz.Name + index }><span>{quiz.Name}</span> <span>{quiz.Count}/{quiz.MaxPlayers}</span></li>
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