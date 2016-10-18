var React = require('react');

var NewQuizMenu = React.createClass({
    propTypes: {
        createQuiz: React.PropTypes.func.isRequired,
        name: React.PropTypes.string
    },
    preventRefresh: function (e) {
        e.preventDefault();
        this.props.createQuiz(e.target);
    },
    render: function () {
        return (
      <div className="NewQuizMenu">
          <h3>Create New Quiz</h3>
          <form onSubmit={this.preventRefresh}>
              <label htmlFor="quizRoomName">Room Name: </label>
              <input type="text"
                     name="quizRoomName"
                     placeholder={this.props.name == null ?
                      "Your room name"
                      :
                      this.props.name + "'s room"} />
              <br />
              <label htmlFor="maxPlayers">Max Players: </label>
              <input type="number"
                     name="maxPlayers"
                     placeholder="Max value is 20" />
              <br />
              <label htmlFor="isPrivate">Private Lobby: </label>
              <input type="checkbox" name="isPrivate" />
              <br />
              <input type="submit" value="Create Quiz" />
          </form>
      </div>
    );
    }
});

module.exports = NewQuizMenu;