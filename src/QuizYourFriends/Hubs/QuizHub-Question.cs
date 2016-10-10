﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using QuizYourFriends.Models;

namespace QuizYourFriends.Hubs
{
    public partial class QuizHub : Hub
    {
        public Player GetCurrentPlayer()
        {
            return ConnectedPlayers.Find(player => player.ConnectionId == Context.ConnectionId);
        }
    }
}
