using System;
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
            if (IsInRoom())
            {
                var players = quiz.Players.Select(p => new { p.Name, p.Score });
                Clients.Group(quiz.Name).playersInLobby(JsonConvert.SerializeObject(players));
            }
        }

        public void CreateQuiz(string name, string max)
        {
            int maxPlayers;
            if (name == null || name.Trim() == "")
            {
                Clients.Caller.message("Room creation failed: Name must be at least 1 character");
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

                Groups.Add(Context.ConnectionId, name);
                Quizzes.Add(new Quiz(name, maxPlayers, GetCurrentPlayer()));
                Clients.Caller.message("Room '" + name + "' created");
                Clients.Caller.inRoom(true);
                PlayersInLobby(GetCurrentQuiz());
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
                    Clients.Caller.inRoom(true);
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
                if (quiz.Players.Count - 1 < 1)
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

                    PlayersInLobby(quiz);
                    MessageGroup(player.Name + " left the room", quiz.Name);
                }

                Clients.Caller.inRoom(false);
                Clients.Caller.message("Left room " + quiz.Name);
            }
        }

        private void GetQuestions()
        {
            var quiz = GetCurrentQuiz();

            quiz.Started = true;
            Clients.Group(quiz.Name).getQuestions();
            MessageGroup("All players ready, waiting for all players to submit their questions", quiz.Name);
        }

        private void StartQuiz()
        {
            var quiz = GetCurrentQuiz().Name;

            Clients.Group(quiz).startQuiz();
            MessageGroup("All questions submitted, starting quiz", quiz);
            Question();
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
