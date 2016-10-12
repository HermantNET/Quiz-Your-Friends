var React = require('react');
var QuizMenu = require('.././Presentational/QuizMenu.jsx');
var ServerRoutes = require('../SignalR-ServerRoutes.js');

var QuizGameContainer = React.createClass({
    getInitialState: function () {
        return {
            hub: $.connection.quizHub,
            connected: false,
            started: false,
            inRoom: false,
            room: 'none',
            playersInLobby: [{ name: 'none', score: 0 }],
            maxPlayers: 1,
            name: prompt("Display name: ")
        }
    },
    componentWillMount: function() {
        $.connection.hub.qs = { name: this.state.name };
        $.connection.hub.start().done(function () {
            this.setState({
                connected: true
            });
        }.bind(this));
    },
    createQuiz: function () {
        ServerRoutes.CreateQuiz(this.state.hub);
    },
    render: function () {
        var view;
        if (!this.state.connected) {
            view = <p>Connecting...</p>;
        }
        else if (this.state.connected && !this.state.inRoom) {
            view = <QuizMenu createQuiz={this.createQuiz} />;
        }
        else {
            view = <p>error</p>;
        }

        return view;
    }
});

module.exports = QuizGameContainer;