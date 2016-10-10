using System.Collections.Generic;

namespace QuizYourFriends.Models
{
    public class Quiz
    {
        public string QuizName { get; set; }
        public int MaxPlayers { get; set; }
        public List<Player> Players { get; set; }
        public List<Question> Questions { get; set; }
    }
}
