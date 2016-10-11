var quizHub = $.connection.quizHub;

quizHub.client.message = function (msg) {
    $('#message').append("<li />", msg);
};

quizHub.client.quizStarted = function () {

}

$.connection.hub.qs = { name: prompt("Display name: ") };
$.connection.hub.start().done(function () {
    $('#create').click(function () {
        quizHub.invoke('CreateQuiz', prompt("Room name: "), 3);
    });

    $('#join').click(function () {
        quizHub.invoke('JoinQuiz', prompt("Room name: "));
    });

    $('#ready').click(function () {
        quizHub.invoke('ReadyUp');
    });

    $('#ready').click(function () {
        quizHub.invoke('LeaveQuiz');
    });
});