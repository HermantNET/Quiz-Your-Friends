using System.Collections.Generic;

namespace QuizYourFriends.Models
{
    public class Quiz
    {
        public string Name { get; set; }
        private int maxPlayers = 5;
        public int MaxPlayers { get { return maxPlayers; } set { maxPlayers = value > 20 ? 20 : value; } }
        public List<Player> Players { get; set; }
        public List<Question> Questions { get; set; }
        public int CurrentQuestion { get; set; }
        public bool Started { get; set; }
        public bool PrivateLobby { get; set; }

        public Quiz(bool priv, string quizName, int maxPlayers, Player creator)
        {
            PrivateLobby = priv;
            Name = quizName.Trim();
            MaxPlayers = maxPlayers;
            Players = new List<Player>();
            Players.Add(creator);
            Players.Capacity = maxPlayers;
            Questions = new List<Question>();
            CurrentQuestion = -1;
            Started = false;
        }
    }
}
