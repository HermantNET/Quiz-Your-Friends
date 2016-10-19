using System.Linq;
using Microsoft.AspNet.SignalR;
using QuizYourFriends.Models;
using Newtonsoft.Json;

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

        private bool IsInRoom()
        {
            if (GetCurrentQuiz() == null)
                return false;
            return true;
        }

        private void PlayersInLobby(Quiz quiz)
        {
            var players = quiz.Players.Select(p => new { p.Name, p.Score }).OrderByDescending(p => p.Score).ThenBy(p => p.Name);
            Clients.Group(quiz.Name).playersInLobby(JsonConvert.SerializeObject(players));
        }

        private void PlayersInLobbyCaller(Quiz quiz)
        {
            var players = quiz.Players.Select(p => new { p.Name, p.Score }).OrderByDescending(p => p.Score).ThenBy(p => p.Name);
            Clients.Caller.playersInLobby(JsonConvert.SerializeObject(players));
        }

        public void PlayersReady()
        {
            var quiz = GetCurrentQuiz();
            Clients.Group(quiz.Name).playersReady(quiz.Players.Where(p => p.Ready).Count());
        }

        public void PlayersReadyCaller()
        {
            var quiz = GetCurrentQuiz();
            Clients.Caller.playersReady(quiz.Players.Where(p => p.Ready).Count());
        }

        public void PlayerMessage(string msg)
        {
            if (IsInRoom())
            {
                var quiz = GetCurrentQuiz().Name;
                var player = GetCurrentPlayer().Name;
                if (msg.Length < 2 && msg.Length <= 140)
                {
                    Clients.Caller.message("Message must be between 1 and 140 characters");
                } else
                {
                    Clients.OthersInGroup(quiz).message(player + ": " + (msg.Length > 140 ? msg.Substring(0, 140) : msg));
                }
            }
        }
    }
}
