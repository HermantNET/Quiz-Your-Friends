using System;
using System.Collections.Generic;
using System.Linq;

namespace QuizYourFriends.Models
{
    public class Question
    {
        public string QuestionBy { get; set; }

        public List<string> AnsweredBy { get; set; }

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


        public Question(string conId, string question, string correct, string[] wrong)
        {
            if (question.Length > 140)
            {
                question = question.Substring(0, 140);
            }

            if (correct.Length > 140)
            {
                correct = correct.Substring(0, 35);
            }

            Array.ForEach(wrong, (w) => { if (w.Length > 140) w = w.Substring(0, 35); });

            QuestionBy = conId;
            Statement = question;
            CorrectAnswer = correct;
            WrongAnswers = wrong;
            AnsweredBy = new List<string>();
        }
    }
}