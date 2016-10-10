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

        private string[] ScrambleAnswers(string correct, string[] wrong)
        {
            return new string[] {"Wallah", "Yallah", "Inshallah", "Mishmallah"};
        }

        public void Question()
        {

        }
    }
}
