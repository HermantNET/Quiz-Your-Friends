module.exports = {
    CreateQuiz: function (hub) {
        hub.invoke('CreateQuiz', prompt("Room name: "), 3);
    },

    JoinQuiz: function () {
        quizHub.invoke('JoinQuiz', prompt("Room name: "));
    },

    ReadyUp: function () {
        quizHub.invoke('ReadyUp');
    },

    LeaveQuiz: function () {
        quizHub.invoke('LeaveQuiz');
    }
}
