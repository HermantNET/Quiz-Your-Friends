using System.Collections.Generic;

namespace QuizYourFriends.Models
{
    public class Quiz
    {
        public string QuizName { get; set; }
        public int MaxPlayers { get; set; }
        public List<Player> Players { get; set; }
        public List<Question> Questions { get; set; }
        public Question CurrentQuestion { get; set; }

        public Quiz(string quizName, int maxPlayers)
        {
            QuizName = quizName.Trim();
            MaxPlayers = maxPlayers;
            Players = new List<Player>();
            Players.Capacity = maxPlayers;
            Questions = new List<Question>();
            CurrentQuestion = new Question(string.Empty, "Are you ready?", "Ready", new string[] { "Ready", "Ready", "Ready" });
        }
    }
}
