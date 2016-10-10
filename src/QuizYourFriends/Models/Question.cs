﻿using System.Linq;

namespace QuizYourFriends.Models
{
    public class Question
    {
        public Player QuestionBy { get; set; }

        private string _statement = string.Empty;
        public string Statement { get { return _statement; } set { _statement = value.Trim(); } }

        private string _correctAnswer = string.Empty;
        public string CorrectAnswer { get { return _correctAnswer; } set { _correctAnswer = value.Trim(); } }

        private string[] _wrongAnswers = new string[3];
        public string[] WrongAnswers {
            get {
                return _wrongAnswers;
            }
            set {
                string[] result = (value.Length == 3) ? value : new string[] { "Error", "Error", "Error" };
                _wrongAnswers = result.Select(q => q.Trim()).ToArray();
            }
        }
    }
}