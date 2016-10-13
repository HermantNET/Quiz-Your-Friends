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
    },

    // TODO send JSON object string
    SubmitQuestion(hub, q) {
        hub.invoke('ComposedQuestion',
            q.question.value,
            q.correct.value,
            q.wrong1.value,
            q.wrong2.value,
            q.wrong3.value);
    }
}
