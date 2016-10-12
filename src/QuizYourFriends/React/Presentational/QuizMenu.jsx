var React = require('react');

function QuizMenu(props) {
    return (
       <div>
           <button onClick={props.createQuiz}>Create Quiz</button>
           <button onClick={props.joinQuiz}>Join Quiz</button>
           <button onClick={props.leaveQuiz}>Leave Quiz</button>
           <button onClick={props.readyUp}>Ready Up</button>
       </div>
    );
}

module.exports = QuizMenu;