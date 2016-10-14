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
    }
}
