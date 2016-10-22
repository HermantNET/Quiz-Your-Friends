var React = require('react');

function QuizMenu(props) {
    return (
       <div className="QuizMenu">
           <div className="Button" onClick={props.createNewQuiz}>Create Quiz</div>
           <div className="Button" onClick={props.joinQuiz}>Join Quiz</div>
           {props.inRoom ?
                (!props.started ?
                    <div>
                        <div className={"Button" + (props.isReady ? " Button-Clicked" : '' )} onClick={props.readyUp }>{props.isReady ? 'Unready' : 'Ready Up'}</div>
                        <div className="Button" onClick={props.leaveQuiz}>Leave Quiz</div>
                    </div>
                    :
                    <div className="Button" onClick={props.leaveQuiz}>Leave Quiz</div>
                )
                :
                ''
           }
       </div>
    );
}

module.exports = QuizMenu;