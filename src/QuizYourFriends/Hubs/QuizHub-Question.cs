using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using QuizYourFriends.Models;

namespace QuizYourFriends.Hubs
{
    // Question Methods
    public partial class QuizHub : Hub
    {
        public void ComposedQuestionAndAnswers(string question, string correct, string wrong1, string wrong2, string wrong3)
        {
            GetCurrentQuiz().Questions.Add(new Question(
                    Context.ConnectionId,
                    question,
                    correct,
                    new string[] { wrong1, wrong2, wrong3}
                ));
        }

        public static string[] ScrambleAnswers(string correct, string[] wrong)
        {
            Random rand = new Random(4329);
            var result = wrong.ToList();
            result.Insert(rand.Next(0, 4), correct);
            return result.ToArray();
        }

        protected void Question(Question ques)
        {

        }
    }
}
