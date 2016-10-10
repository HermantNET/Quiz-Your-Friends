using System;
using System.Threading.Tasks;
using Owin;
using Microsoft.Owin;

[assembly: OwinStartup(typeof(QuizYourFriends.StartupForOwin))]

namespace QuizYourFriends
{
    public class StartupForOwin
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();
        }
    }
}
