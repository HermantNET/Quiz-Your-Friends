using System;
using System.Linq;
using Microsoft.AspNet.SignalR;
using QuizYourFriends.Models;
using Newtonsoft.Json;

namespace QuizYourFriends.Hubs
{
    // Question Methods
    public partial class QuizHub : Hub
    {
        // TODO accept JSON object string and parse
        public void ComposedQuestion(string question, string correct, string wrong1, string wrong2, string wrong3)
        {
            var quiz = GetCurrentQuiz();
            var newQuestion = new Question(
                    Context.ConnectionId,
                    question,
                    correct,
                    new string[] { wrong1, wrong2, wrong3 }
                );

            var existingQuestion = quiz.Questions.Find(q => q.QuestionBy == Context.ConnectionId);
            if (existingQuestion == null)
            {
                quiz.Questions.Add(newQuestion);
                Clients.Group(quiz.Name).incrementQuestionCount();
                Clients.OthersInGroup(quiz.Name).message("A message has been submitted");
            }
            // If user has already submitted a question, replace their previous question with the new one.
            else
            {
                existingQuestion = newQuestion;
            }

            // Start the quiz if all users have submitted a question
            if (quiz.Questions.Count == quiz.Players.Count)
            {
                StartQuiz();
            }
        }

        public static string[] ScrambleAnswers(string correct, string[] wrong)
        {
            Random rand = new Random();
            var result = wrong.ToList();
            result.Insert(rand.Next(0, 4), correct);
            return result.ToArray();
        }

        protected void Question()
        {
            var quiz = GetCurrentQuiz();
            var question = quiz.Questions.ElementAtOrDefault(++quiz.CurrentQuestion);

            if (quiz.CurrentQuestion == quiz.Questions.Count)
            {
                EndQuiz();
            }
            else
            {
                // Send client the question and scrambled answers
                Clients.Group(quiz.Name).question(question.Statement,
                    JsonConvert.SerializeObject(ScrambleAnswers(question.CorrectAnswer, question.WrongAnswers)));
            }
        }

        public void SubmitAnswer(string answer)
        {
            var quiz = GetCurrentQuiz();
            if (quiz.CurrentQuestion > quiz.Questions.Count)
            {
                EndQuiz();
            } else
            {
                var question = quiz.Questions.ElementAt(quiz.CurrentQuestion);
                // If a player has already answered a question they will not be given another chance ;)
                if (question.AnsweredBy.Any(conId => Context.ConnectionId == conId))
                {
                    Clients.Caller.message("You have already answered this question");
                }
                else
                {
                    var player = GetCurrentPlayer();
                    question.AnsweredBy.Add(Context.ConnectionId);
                    if (answer == question.CorrectAnswer)
                    {
                        player.Score += 50;
                        PlayersInLobby(quiz);
                        MessageGroup(player.Name + " was correct", quiz.Name);
                    }
                    else
                    {
                        MessageGroup(player.Name + " was wrong", quiz.Name);
                        Clients.Caller.message(string.Format("The correct answer was '{0}'", question.CorrectAnswer));
                    }
                }

                // Check if all users have answered the question, if so proceed to the next one
                if (question.AnsweredBy.Count == quiz.Players.Count)
                {
                    Question();
                }
            }
        }
    }
}
