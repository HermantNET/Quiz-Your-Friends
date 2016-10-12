module.exports = {
    CreateQuiz: function (hub) {
        hub.invoke('CreateQuiz', prompt("Room name: "), prompt("Max players: "));
    },

    JoinQuiz: function (hub) {
        hub.invoke('JoinQuiz', prompt("Room name: "));
    },

    ReadyUp: function (hub) {
        hub.invoke('ReadyUp');
    },

    LeaveQuiz: function (hub) {
        hub.invoke('LeaveQuiz');
    }
}
