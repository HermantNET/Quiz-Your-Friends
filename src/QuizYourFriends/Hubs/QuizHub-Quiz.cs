﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using QuizYourFriends.Models;
using Newtonsoft.Json;

namespace QuizYourFriends.Hubs
{
    // Quiz Methods
    public partial class QuizHub : Hub
    {
        private void PlayersInLobby(Quiz quiz)
        {
                var players = quiz.Players.Select(p => new { p.Name, p.Score }).OrderByDescending(p => p.Score).ThenBy(p => p.Name);
                Clients.Group(quiz.Name).playersInLobby(JsonConvert.SerializeObject(players));
        }

        public void CreateQuiz(string name, string max)
        {
            string trimmedName = name == null ? "" : name.Trim();
            if (Quizzes.Where(quiz => quiz.Name == trimmedName) != null)
            {
                int maxPlayers;
                if (trimmedName == "")
                {
                    Clients.Caller.message("Room creation failed: Name must be at least 1 character");
                }
                else if (trimmedName == "none")
                {
                    Clients.Caller.message("Can not make room with name of 'none'");
                }
                else if (!int.TryParse(max, out maxPlayers))
                {
                    Clients.Caller.message("Room creation failed: max must be an integer");
                }
                else if (maxPlayers < 2)
                {
                    Clients.Caller.message("Room creation failed: maximum players must be greater than 1");
                }
                else
                {
                    // 
                    if (IsInRoom())
                    {
                        LeaveQuiz();
                    }

                    Groups.Add(Context.ConnectionId, trimmedName);
                    Quizzes.Add(new Quiz(trimmedName, maxPlayers, GetCurrentPlayer()));
                    Clients.Caller.message("Room '" + trimmedName + "' created");
                    Clients.Caller.inRoom(true, name, max);
                    PlayersInLobby(GetCurrentQuiz());
                }
            }
            else
            {
                Clients.Caller.message("Room already exists");
            }
            
        }

        public async void JoinQuiz(string name)
        {
            // Check if quiz exists
            var exists = Quizzes.Exists(q => q.Name == name);

            // Check if the quiz has started
            if (exists && !Quizzes.Find(q => q.Name == name).Started)
            {
                var quiz = Quizzes.Find(q => q.Name == name);

                if (quiz.MaxPlayers > quiz.Players.Count)
                {
                    // Leave room if already in another quiz
                    if (IsInRoom())
                        LeaveQuiz();

                    var player = GetCurrentPlayer();

                    await Groups.Add(Context.ConnectionId, name);
                    quiz.Players.Add(player);
                    Clients.Caller.inRoom(true, name, quiz.MaxPlayers);
                    MessageGroup(player.Name + " joined the room");
                    PlayersInLobby(quiz);
                }
                else
                {
                    Clients.Caller.message("Player count reached");
                }
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

        public async void LeaveQuiz()
        {
            var player = GetCurrentPlayer();
            var quiz = GetCurrentQuiz();

            if (quiz == null)
            {
                Clients.Caller.message("You are not in a room");
            }
            else
            {
                // Delete Quiz room if no players are in it
                if (quiz.Players.Count - 1 == 0)
                {
                    // TODO fix TaskCanceledException, refactor
                    // Error occurs 10 seconds after client closes quiz tab
                    try
                    {
                        await Groups.Remove(Context.ConnectionId, quiz.Name);
                    }
                    catch (TaskCanceledException e)
                    {
                        Console.WriteLine(e.Message);
                    }
                    Quizzes.Remove(quiz);
                }
                else
                {
                    quiz.Players.Remove(player);
                    // Error occurs 10 seconds after client closes quiz tab
                    try
                    {
                        await Groups.Remove(Context.ConnectionId, quiz.Name);
                    }
                    catch (TaskCanceledException e)
                    {
                        Console.WriteLine(e.Message);
                    }

                    MessageGroup(player.Name + " left the room", quiz.Name);
                }

                player.Score = 0;
                player.Ready = false;
                Clients.Caller.reset();
                Clients.Caller.message("Left room " + quiz.Name);
                PlayersInLobby(quiz);
            }
        }

        private void GetQuestions()
        {
            var quiz = GetCurrentQuiz();

            quiz.Started = true;
            Clients.Group(quiz.Name).getQuestions(true);
            MessageGroup("All players ready, waiting for all players to submit their questions", quiz.Name);
        }

        private void StartQuiz()
        {
            var quiz = GetCurrentQuiz().Name;
            Clients.Group(quiz).startQuiz(true);
            Clients.Group(quiz).getQuestions(false);
            MessageGroup("All questions submitted, starting quiz", quiz);
            Question();
        }

        private void EndQuiz()
        {
            var quiz = GetCurrentQuiz();
            Clients.Group(quiz.Name).quizEnded(true);
        }

        private void PlayAgain()
        {

        }

        public void ReadyUp()
        {
            var player = GetCurrentPlayer();
            var quiz = GetCurrentQuiz();

            if (quiz == null)
            {
                Clients.Caller.message("You need to be in a room to ready up");
            }
            else
            {
                player.Ready = !player.Ready;
                Clients.Group(quiz.Name).message(player.Name + ((player.Ready == true) ? " is ready" : " is not ready"));
                if(quiz.Players.Count > 1 && quiz.Players.Where(p => p.Ready).Count() == quiz.Players.Count)
                {
                    GetQuestions();
                }
            }
        }
    }
}
