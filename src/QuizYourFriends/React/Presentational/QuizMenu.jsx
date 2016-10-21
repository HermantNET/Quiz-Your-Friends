var React = require('react');

function QuizMenu(props) {
    return (
       <div className="QuizMenu">
           <div className="Button" onClick={props.createNewQuiz}>Create Quiz</div>
           <div className="Button" onClick={props.joinQuiz}>Join Quiz</div>
           {props.inRoom ?
                <div>
                    <div className="Button" onClick={props.readyUp }>Ready Up</div>
                    <div className="Button" onClick={props.leaveQuiz}>Leave Quiz</div>
                </div> : ''
           }
       </div>
    );
}

module.exports = QuizMenu;