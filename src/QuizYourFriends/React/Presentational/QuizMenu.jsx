var React = require('react');

function QuizMenu(props) {
    return (
       <div className="QuizMenu">
           <div className="Button" onClick={props.createNewQuiz}>Create Quiz</div>
           <div className="Button" onClick={props.joinQuiz}>Join Quiz</div>
           <div className="Button" onClick={props.leaveQuiz}>Leave Quiz</div>
           <div className="Button" onClick={props.readyUp}>Ready Up</div>
       </div>
    );
}

module.exports = QuizMenu;