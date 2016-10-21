module.exports = {
    getPublicQuizzes: function (hub) {
        hub.invoke('GetPublicQuizzes');
    },

    CreateQuiz: function (hub, quiz) {
        let maxPlayers = quiz.maxPlayers.value === "" ? "5" : quiz.maxPlayers.value; 
        hub.invoke('CreateQuiz', quiz.isPrivate.checked, quiz.quizRoomName.value, maxPlayers);
    },

    JoinQuiz: function (hub, quizName) {
        hub.invoke('JoinQuiz', quizName);
    },

    ReadyUp: function (hub) {
        hub.invoke('ReadyUp');
    },

    LeaveQuiz: function (hub) {
        hub.invoke('LeaveQuiz');
    },

    // TODO send JSON object string
    SubmitQuestion: function (hub, q) {
        hub.invoke('ComposedQuestion',
            q.question.value,
            q.correct.value,
            q.wrong1.value,
            q.wrong2.value,
            q.wrong3.value);
    },

    SubmitAnswer: function (hub, answer) {
        hub.invoke('SubmitAnswer', answer);
    },

    PlayersReady: function (hub) {
        hub.invoke('PlayersReady');
    },

    SendMessage: function (hub, msg) {
        hub.invoke('PlayerMessage', msg);
    }
}
