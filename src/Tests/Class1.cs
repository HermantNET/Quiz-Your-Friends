using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace Tests
{
    public class class1
    {
        [Theory]
        [InlineData("banana")]
        [InlineData("cat")]
        public void ScrambleQuestions(string correct)
        {
            string[] wrong = { "meow", "meow", "meow" };

            List<string[]> possibleAnswers = new List<string[]>();

            // TODO dynamically generate possible answers
            possibleAnswers.Add(new string[] { correct, "meow", "meow", "meow" });
            possibleAnswers.Add(new string[] { "meow", correct, "meow", "meow" });
            possibleAnswers.Add(new string[] { "meow", "meow", correct, "meow" });
            possibleAnswers.Add(new string[] { "meow", "meow", "meow", correct });

            bool pass = true;
            for (int i = 0; i < 50; i++)
            {
                string[] scramble = QuizYourFriends.Hubs.QuizHub.ScrambleAnswers(correct, wrong);
                int index = possibleAnswers.FindIndex(ans => ans.SequenceEqual(scramble));

                if (index == -1)
                    pass = false;
            }

            Assert.True(pass);
        }
    }
}