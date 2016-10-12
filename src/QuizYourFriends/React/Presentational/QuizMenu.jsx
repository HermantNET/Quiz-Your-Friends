var React = require('react');

function QuizMenu(props) {
    return (
       <div>
           <button onClick={props.createQuiz}>Create Quiz</button>
       </div>
    );
}

module.exports = QuizMenu;