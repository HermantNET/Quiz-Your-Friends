using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuizYourFriends.Tests
{
    [TestFixture]
    public class TestClass
    {
        [Test]
        public void TestMethod()
        {
            // TODO: Add your test code here
            Assert.Pass("Your first passing test");
        }

        [Test]
        public void ScrambleQuestions()
        {
            string correct = "cats";
            string[] wrong = { "meow", "meow", "meow" };

            List<string[]> possibleAnswers = new List<string[]>();

            // TODO dynamically generate possible answers
            possibleAnswers.Add(new string[] { "cats", "meow", "meow", "meow" });
            possibleAnswers.Add(new string[] { "meow", "cats", "meow", "meow" });
            possibleAnswers.Add(new string[] { "meow", "meow", "cats", "meow" });
            possibleAnswers.Add(new string[] { "meow", "meow", "meow", "cats" });

            bool pass = true;
            for (int i = 0; i < 50; i++)
            {
                string[] scramble = QuizHub.ScrambleAnswers(correct, wrong);
                int index = possibleAnswers.FindIndex(ans => ans == scramble);

                if (index == -1)
                    pass = false;
            }

            Assert.IsTrue(pass, "Blah");
            Assert.Pass("Passed!");
        }
    }
}
