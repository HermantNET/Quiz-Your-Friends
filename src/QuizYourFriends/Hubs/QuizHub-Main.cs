using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using QuizYourFriends.Models;

namespace QuizYourFriends.Hubs
{
    // Main Methods
    public partial class QuizHub : Hub
    {
        static List<Player> ConnectedPlayers = new List<Player>();
        static List<Quiz> Quizzes = new List<Quiz>();

        // On Connection, add player to ConnectedPlayers List
        public override Task OnConnected()
        {
            // If name is empty or null, assign dynamic anonymous identity
            string name = Context.QueryString["name"];
            name = name.Trim() == "" || name == null ? "Anon" + ConnectedPlayers.Count + 1 : name.Trim();

            Player player = new Player(Context.ConnectionId, name);
            ConnectedPlayers.Add(player);
            return base.OnConnected();
        }

        // On Disconnect, remove player from ConnectedPlayers List
        public override Task OnDisconnected(bool stopCalled)
        {
            if (IsInRoom())
            {
                LeaveQuiz();
            }
            ConnectedPlayers.Remove(GetCurrentPlayer());
            return base.OnDisconnected(stopCalled);
        }
    }
}
