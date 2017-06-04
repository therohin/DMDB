using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(DMDB.Startup))]
namespace DMDB
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
