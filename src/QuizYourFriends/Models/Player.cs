namespace QuizYourFriends.Models
{
    public class Player
    {
        public string ConnectionId { get; set; }
        public string Name { get; set; }
        public string CurrentQuizRoom { get; set; }
        public int Score { get; set; }
    }
}
