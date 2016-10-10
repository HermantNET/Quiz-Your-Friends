﻿using System;
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
            Player player = new Player(Context.ConnectionId, Context.QueryString["name"]);
            ConnectedPlayers.Add(player);
            return base.OnConnected();
        }

        // On Disconnect, remove player from ConnectedPlayers List
        public override Task OnDisconnected(bool stopCalled)
        {
            ConnectedPlayers.Remove(GetCurrentPlayer());
            return base.OnDisconnected(stopCalled);
        }

        public void Hello()
        {
            Clients.All.hello("Hello, " + GetCurrentPlayer().Name + "!");
        }
    }
}
