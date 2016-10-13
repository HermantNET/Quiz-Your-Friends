using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
            Random rand = new Random(4329);
            var result = wrong.ToList();
            result.Insert(rand.Next(0, 4), correct);
            return result.ToArray();
        }

        protected void Question()
        {
            var quiz = GetCurrentQuiz();
            var question = quiz.Questions.ElementAtOrDefault(++quiz.CurrentQuestion);

            if (question == null)
            {
                EndQuiz();
            }
            
            Clients.Group(quiz.Name).question(question.Statement,
                JsonConvert.SerializeObject(ScrambleAnswers(question.CorrectAnswer, question.WrongAnswers)));
        }
    }
}
