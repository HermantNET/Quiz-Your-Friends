namespace QuizYourFriends.Models
{
    public class Player
    {
        public string ConnectionId { get; set; }
        public string Name { get; set; }
        public int Score { get; set; }
        public bool Ready { get; set; }

        public Player(string conId, string name)
        {
            ConnectionId = conId;
            Name = name;
            Score = 0;
            Ready = false;
        }
    }
}
