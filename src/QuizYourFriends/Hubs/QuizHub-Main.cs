﻿using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using QuizYourFriends.Models;
using Newtonsoft.Json;

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
            string name = Context.QueryString["name"].Trim();
            if (name == "" || name == null)
            {
                name = "Anon";
            } else if (name.Length > 24)
            {
                name = name.Substring(0, 24);
            }

            bool unique = false;
            while (!unique)
            {
                if (ConnectedPlayers.Exists(p => p.Name == name))
                {
                    name += new Random().Next(0, ConnectedPlayers.Count + 10000);
                }
                else
                {
                    unique = true;
                }
            }

            Clients.Caller.setName(name);

            Player player = new Player(Context.ConnectionId, name);
            ConnectedPlayers.Add(player);
            Clients.Caller.message("Connected");
            return base.OnConnected();
        }

        public void GetPublicQuizzes()
        {
            var quizzes = Quizzes.Where(q => q.PrivateLobby == false && q.Started == false)
                                 .Select(q => new { q.Name, q.Players.Count, q.MaxPlayers })
                                 .ToArray();
            if (quizzes.Length == 0) quizzes = null;
            Clients.Caller.getPublicQuizzes(JsonConvert.SerializeObject(quizzes));
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

        private void MessageGroup(string msg, string group)
        {
            Clients.Group(group).message(msg);
        }

        private void MessageGroup(string msg)
        {
            Clients.Group(GetCurrentQuiz().Name).message(msg);
        }
    }
}
