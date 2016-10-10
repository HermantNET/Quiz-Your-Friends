namespace QuizYourFriends.Models
{
    public class Question
    {
        private string _statement = string.Empty;
        public string Statement { get { return _statement; } set { _statement = value; } }

        private string _correctAnswer = string.Empty;
        public string CorrectAnswer { get { return _correctAnswer; } set { _correctAnswer = value; } }

        private string[] _wrongAnswers = new string[3];
        public string[] WrongAnswers { get { return _wrongAnswers; } set { _wrongAnswers = (value.Length == 3) ? value : new string[] { "Error", "Error", "Error" }; } }
    }
}