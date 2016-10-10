﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using QuizYourFriends.Models;

namespace QuizYourFriends.Hubs
{
    // Quiz Methods
    public partial class QuizHub : Hub
    {
        public void CreateQuiz(string name, int max)
        {
            Groups.Add(Context.ConnectionId, name);
            Quizzes.Add(new Quiz(name, max, GetCurrentPlayer()));
            Clients.Caller.message("Room '" + name + "' created!");
        }

        public async void JoinQuiz(string name)
        {
            // Check if quiz exists
            var exists = Quizzes.Exists(q => q.Name == name);

            // Check if the quiz has started
            if (exists && !Quizzes.Find(q => q.Name == name).Started)
            {
                var player = GetCurrentPlayer();
                var quiz = Quizzes.Find(q => q.Name == name);

                await Groups.Add(Context.ConnectionId, name);
                quiz.Players.Add(player);
                Clients.Group(quiz.Name).message(player.Name + " joined the room");
            }
            // Quiz has already started
            else if (exists)
            {
                Clients.Caller.message("Quiz has already started");
            }
            // Quiz does not exist
            else
            {
                Clients.Caller.message("Room does not exist");
            }
        }

        public void LeaveQuiz()
        {
            var player = GetCurrentPlayer();
            var quiz = GetCurrentQuiz();

            quiz.Players.Remove(player);
            Clients.Group(quiz.Name).message(player.Name + " left the room");
            Groups.Remove(Context.ConnectionId, quiz.Name);
        }

        private void StartQuiz()
        {
            var quiz = GetCurrentQuiz();

            quiz.Started = true;
            Clients.Group(quiz.Name).quizStarted(true);
        }

        private void EndQuiz()
        {
            
        }

        private void PlayAgain()
        {

        }

        public void ReadyUp()
        {
            var player = GetCurrentPlayer();
            var quiz = GetCurrentQuiz();

            player.Ready = !player.Ready;
            Clients.Group(quiz.Name).message(player.Name + ((player.Ready == true) ? " is ready" : " is not ready"));
            if (quiz.Players.Count() > 1 && quiz.Players.Select(p => p.Ready).Count() == quiz.Players.Count())
            {
                StartQuiz();
            }
        }
    }
}
