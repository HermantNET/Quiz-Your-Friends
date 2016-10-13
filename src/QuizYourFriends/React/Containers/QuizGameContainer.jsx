var React = require('react');
var QuizMenu = require('.././Presentational/QuizMenu.jsx');
var QuizRoom = require('.././Presentational/QuizRoom.jsx');
var ServerRoutes = require('../SignalR-ServerRoutes.js');
var MessageList = require('.././Presentational/MessageList.jsx');
var UserList = require('.././Presentational/UserList.jsx');
var ComposeQuestion = require('.././Presentational/ComposeQuestion.jsx');
var Question = require('.././Presentational/Question.jsx')

var QuizGameContainer = React.createClass({
    getInitialState: function () {
        return {
            hub: $.connection.quizHub,
            connected: false,
            getQuestions: false,
            started: false,
            inRoom: false,
            room: 'none',
            playersInLobby: [],
            name: prompt("Display name: "),
            messages: [],
            question: 'none',
            answers: []
        }
    },
    componentWillMount: function () {
        // Set the users name server side
        $.connection.hub.qs = { name: this.state.name };
        $.connection.hub.start().done(function () {
            this.setState({
                connected: true
            });
        }.bind(this));
    },
    componentDidMount: function () {

        // Client side response code for SignalR
        this.state.hub.client.message = function (msg) {
            console.log(msg);
            this.setState({
                messages: this.state.messages.concat(msg)
            });
        }.bind(this);

        this.state.hub.client.getQuestions = function () {
            this.setState({
                getQuestions: true
            });
            console.log('Waiting for questions');
        }.bind(this);

        this.state.hub.client.startQuiz = function () {
            this.setState({
                started: true
            });
            console.log('Quiz has started');
        }.bind(this);

        this.state.hub.client.playersInLobby = function (players) {
            console.log(players);
            this.setState({
                playersInLobby: JSON.parse(players)
            });
        }.bind(this);

        this.state.hub.client.inRoom = function (bool) {
            this.setState({
                inRoom: bool
            });
        }.bind(this);

        this.state.hub.client.question = function (question, answers) {
            this.setState({
                question: question,
                answers: JSON.parse(answers)
            });
            console.log(question + " " + answers);
        }.bind(this);
        // End Client side response code for SignalR

    },

    // SignalR call server code
    createQuiz: function () {
        ServerRoutes.CreateQuiz(this.state.hub);
    },
    joinQuiz: function () {
        ServerRoutes.JoinQuiz(this.state.hub);
    },
    leaveQuiz: function () {
        ServerRoutes.LeaveQuiz(this.state.hub);
    },
    readyUp: function () {
        ServerRoutes.ReadyUp(this.state.hub);
    },

    submitQuestion: function (e) {
        e.preventDefault();
        console.log(e.target.question.value);
        ServerRoutes.SubmitQuestion(this.state.hub, e.target);
    },
    chooseAnswer: function (e) {
        console.log(e.target.textContent);
        ServerRoutes.SubmitAnswer(this.state.hub, e.target.textContent);
    },
    // End SignalR call server code

    render: function () {
        var view;
        if (!this.state.connected) {
            view = <p>Connecting...</p>;
        }
        else if (!this.state.inRoom) {
            view = <p>Create or join a room to play</p>;
        }
        else if (this.state.inRoom && !this.state.getQuestions) {
            view = <QuizRoom />;
        }
        else if (this.state.getQuestions && !this.state.started) {
            view = <ComposeQuestion submit={this.submitQuestion} />
        }
        else if (this.state.started) {
            view = <Question chooseAnswer={this.chooseAnswer}
                             question={this.state.question}
                             answers={this.state.answers} />
        }
        else {
            view = <p>error</p>;
        }

        return (
            <div>
                <QuizMenu createQuiz={this.createQuiz}
                          joinQuiz={this.joinQuiz}
                          leaveQuiz={this.leaveQuiz}
                          readyUp={this.readyUp} />
                {view}
                {this.state.inRoom ? <UserList players={this.state.playersInLobby} /> : ''}
                <MessageList messages={this.state.messages} />
            </div>
        );
    }
});

module.exports = QuizGameContainer;