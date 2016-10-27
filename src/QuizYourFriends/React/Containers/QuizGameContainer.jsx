var React = require('react');
var QuizMenu = require('.././Presentational/QuizMenu.jsx');
var QuizRoom = require('.././Presentational/QuizRoom.jsx');
var ServerRoutes = require('../SignalR-ServerRoutes.js');
var MessageList = require('.././Presentational/MessageList.jsx');
var UserList = require('.././Presentational/UserList.jsx');
var ComposeQuestion = require('.././Presentational/ComposeQuestion.jsx');
var Question = require('.././Presentational/Question.jsx');
var QuizEnd = require('.././Presentational/QuizEnd.jsx');
var NewQuizMenu = require('.././Presentational/NewQuizMenu.jsx');
var PublicQuizzes = require('.././Presentational/PublicQuizzes.jsx');
var AnsweredQuestion = require('.././Presentational/AnsweredQuestion.jsx');
var Ad = require('.././Presentational/Ad.jsx');

var QuizGameContainer = React.createClass({
    getInitialState: function () {
        return {
            hub: $.connection.quizHub,
            connected: false,
            inRoom: false,
            publicQuizzes: null,
            createQuiz: false,
            getQuestions: false,
            started: false,
            ended: false,
            isReady: false,
            readyCount: 0,
            room: 'none',
            maxPlayers: 0,
            players: [],
            playersFinal: [],
            name: 'Anon',
            messages: [],
            currentQuestionNum: 0,
            questionCount: 0,
            question: 'none',
            answers: [],
            answered: false,
            isRight: false,
            correctAnswer: 'Loading...'
        }
    },
    componentWillMount: function () {
        // Set the users name server side
        $.connection.hub.qs = { name: prompt("Display name: ") };
        $.connection.hub.start().done(function () {
            this.setState({
                connected: true
            });
            this.getPublicQuizzes();
        }.bind(this));
    },
    componentDidMount: function () {
        // Client side response code for SignalR
        this.state.hub.client.setName = function (name) {
            this.setState({
                name: name
            });
        }.bind(this);

        this.state.hub.client.message = function (msg) {
            this.setState({
                messages: this.state.messages.concat(msg)
            });
        }.bind(this);

        this.state.hub.client.getPublicQuizzes = function (quizzes) {
            console.log(quizzes);
            this.setState({
                publicQuizzes: JSON.parse(quizzes)
            });
        }.bind(this);

        this.state.hub.client.getQuestions = function (bool) {
            this.setState({
                getQuestions: bool
            });
        }.bind(this);

        this.state.hub.client.startQuiz = function (bool) {
            this.setState({
                started: bool,
                questionCount: this.state.players.length
            });
        }.bind(this);

        this.state.hub.client.playersInLobby = function (players) {
            this.setState({
                players: JSON.parse(players)
            });
            console.log(players);
        }.bind(this);

        this.state.hub.client.inRoom = function (bool, room, max) {
            this.setState({
                inRoom: bool,
                room: room,
                maxPlayers: max
            });
        }.bind(this);

        this.state.hub.client.playersReady = function (num) {
            this.setState({
                readyCount: num
            });
        }.bind(this);

        this.state.hub.client.incrementQuestionCount = function (num) {
            this.setState({
                questionCount: this.state.questionCount + 1
            });
        }.bind(this);

        this.state.hub.client.question = function (question, answers) {
            this.setState({
                question: question,
                answers: JSON.parse(answers),
                answered: false,
                isRight: false,
                correctAnswer: 'Loading...'
            });
        }.bind(this);

        this.state.hub.client.isRight = function (bool, correct) {
            this.setState({
                isRight: bool,
                correctAnswer: correct
            });
        }.bind(this);

        this.state.hub.client.quizEnded = function (bool) {
            this.setState({
                ended: bool,
                playersFinal: this.state.players
            });
        }.bind(this);

        this.state.hub.client.reset = function () {
            this.setState({
                getQuestions: false,
                started: false,
                ended: false,
                inRoom: false,
                question: 'none',
                room: 'none',
                maxPlayers: 0,
                answers: [],
                players: [],
                playersFinal: [],
                isRight: false,
                correctAnswer: '',
                questionCount: 0,
                isReady: false,
                answered: false

            })
        }.bind(this);
        // End Client side response code for SignalR
    },

    // SignalR call server code
    getPublicQuizzes: function () {
        ServerRoutes.getPublicQuizzes(this.state.hub);
    },
    createQuiz: function (quiz) {
        ServerRoutes.CreateQuiz(this.state.hub, quiz);
        this.setState({
            createQuiz: false
        });
    },
    joinQuiz: function (quizName) {
        if (quizName == null) {
            quizName = prompt("Quiz name: ");
        }
        ServerRoutes.JoinQuiz(this.state.hub, quizName);
    },
    leaveQuiz: function () {
        ServerRoutes.LeaveQuiz(this.state.hub);
    },
    readyUp: function () {
        ServerRoutes.ReadyUp(this.state.hub);
        this.setState({
            isReady: !this.state.isReady
        })
    },
    playersReady: function () {
        ServerRoutes.PlayersReady(this.state.hub);
    },

    submitQuestion: function (e) {
        e.preventDefault();
        ServerRoutes.SubmitQuestion(this.state.hub, e.target);
        this.setState({
            messages: this.state.messages.concat("Question submitted. Waiting for all players to submit their questions...")
        });
    },
    submitAnswer: function (e) {
        ServerRoutes.SubmitAnswer(this.state.hub, e.target.textContent);
        this.setState({
            answered: true
        });
    },
    sendMessage: function (msg) {
        ServerRoutes.SendMessage(this.state.hub, msg);
        if (this.state.inRoom) {
            this.setState({
                messages: this.state.messages.concat("you: " + msg)
            });
        } else {
            this.setState({
                messages: this.state.messages.concat("You are not in a room")
            });
        }
    },
    // End SignalR call server code

    createNewQuiz: function () {
        this.setState({
            createQuiz: !this.state.createQuiz
        });
    },
    playAgain: function () {
        this.setState({
            started: false,
            ended: false,
            playersFinal: [],
            question: [],
            answers: [],
            players: this.state.players.map((player) => { player.Score = 0; return player; }),
            readyCount: 0,
            isReady: false,
            answered: false,
            isRight: false,
            correctAnswer: '',
            questionCount: 0
        });
    },

    render: function () {
        var view;
        if (!this.state.connected) {
            view = <p>Connecting...</p>;
        }
        else if (!this.state.inRoom) {
            view = <p>Create or join a room to play</p>;
        }
        else if (this.state.inRoom && !this.state.getQuestions && !this.state.started) {
            view = <QuizRoom ready={this.state.readyCount} playerCount={this.state.players == [] ? 1 : this.state.players.length } />;
        }
        else if (this.state.getQuestions && !this.state.started) {
            view = <ComposeQuestion submit={this.submitQuestion} questionsSubmitted={this.state.questionCount} />
        }
        else if (this.state.started && !this.state.ended && !this.state.answered) {
            view = <Question submitAnswer={this.submitAnswer}
                             question={this.state.question}
                             answers={this.state.answers}
                             questionCount={this.state.questionCount}
                             currentQuestionNum={this.state.currentQuestionNum} />
        }
        else if (this.state.started && !this.state.ended && this.state.answered) {
            view = <AnsweredQuestion correct={this.state.correctAnswer} isRight={this.state.isRight} />
        }
        else if (this.state.ended) {
            view = <QuizEnd players={this.state.playersFinal} playAgain={this.playAgain } />;
        }
        else {
            view = <p>error</p>;
        }

        return (
            <div className="App">
                <div className="Options">
                    <h2 className="Title">Quizayy</h2>
                    <p className="ConnectedAs">Connected as: <span className="Heavy">{this.state.name}</span></p>
                    <div className="RoomState">{this.state.room == 'none' ? <p>Not in a room</p> : <p>Currently in room: <span className="Heavy">{this.state.room}</span></p> }</div>
                    <QuizMenu createNewQuiz={this.createNewQuiz}
                              joinQuiz={() => this.joinQuiz(null)}
                              leaveQuiz={this.leaveQuiz}
                              readyUp={this.readyUp}
                              inRoom={this.state.inRoom}
                              isReady={this.state.isReady}
                              started={this.state.getQuestions}
                    />
                    <Ad adStyle={{ display: 'inline-block', width: '320px', height: '100px' }} adClient="ca-pub-9195714093896960" adSlot="7042347011" />
                </div>
                <div className="Main">
                    {this.state.createQuiz ? <NewQuizMenu createQuiz={this.createQuiz} name={this.state.name } /> : ''}
                    {view}
                    {this.state.inRoom ? '' : <PublicQuizzes quizzes={this.state.publicQuizzes} joinQuiz={this.joinQuiz} refresh={this.getPublicQuizzes } /> }
                </div>
                <div className="UsersAndMessages">
                    {this.state.inRoom ? <UserList players={this.state.players} max={this.state.maxPlayers } /> : ''}
                    <h4>Messages</h4>
                    <MessageList messages={this.state.messages} sendMessage={this.sendMessage} />
                    <p id="contact">
                        <small>
                            Comments, Questions, Inqueries?<br />
                            <a href="thomas@tehjr.com">thomas@tehjr.com</a><br />
                            <a href="https://www.google.com/policies/privacy/partners/">Privacy Policy</a>
                        </small>
                    </p>
                    <Ad adStyle={{ display: 'inline-block', width: '336px', height: '280px' }} adClient="ca-pub-9195714093896960" adSlot="4088880613" />
                </div>
            </div>
        );
    }
});

module.exports = QuizGameContainer;