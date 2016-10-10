using Owin;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace QuizYourFriends
{
    using Microsoft.AspNetCore.Builder;
    using Microsoft.Owin.Builder;
    using AppFunc = Func<IDictionary<string, object>, Task>;

    public static class AppBuilderExtensions
    {
        public static IApplicationBuilder UseAppBuilder(this IApplicationBuilder app, Action<IAppBuilder> configure)
        {
            app.UseOwin(addToPipeLine =>
            {
                addToPipeLine(next =>
                {
                    var appBuilder = new AppBuilder();
                    appBuilder.Properties["builder.DefaultApp"] = next;

                    configure(appBuilder);

                    return appBuilder.Build<AppFunc>();
                });
            });

            return app;
        }

        public static void UseSignalR(this IApplicationBuilder app)
        {
            app.UseAppBuilder(appBuilder => appBuilder.MapSignalR());
        }
    }
}
