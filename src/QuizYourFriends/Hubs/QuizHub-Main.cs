using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;

namespace QuizYourFriends.Hubs
{
    public partial class QuizHub : Hub
    {
        public override Task OnConnected()
        {
            return base.OnConnected();
        }

        public void Hello()
        {
            Clients.All.hello("Hello!");
        }
    }
}
