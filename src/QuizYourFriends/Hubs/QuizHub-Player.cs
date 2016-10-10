using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using QuizYourFriends.Models;

namespace QuizYourFriends.Hubs
{
    // Player methods
    public partial class QuizHub : Hub
    {
        // Return Player reference of invoker
        private Player GetCurrentPlayer()
        {
            return ConnectedPlayers.Find(player => player.ConnectionId == Context.ConnectionId);
        }

        // Return Quiz of invoker
        private Quiz GetCurrentQuiz()
        {
            return Quizzes.Find(quiz => quiz.Players.Any(p => p.ConnectionId == Context.ConnectionId));
        }
    }
}
