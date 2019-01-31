using AngularJSAuthentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.ExceptionHandling;

namespace WebApplication3
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {

            log4net.Config.XmlConfigurator.Configure();
            Helper.log.Debug("Startup");

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            // Remove default XML handler
            var matches =
                config.Formatters.Where(
                    f =>
                        f.SupportedMediaTypes.Where(
                            m => m.MediaType.ToString() == "application/xml" || m.MediaType.ToString() == "text/xml")
                            .Count() > 0).ToList();
            foreach (var match in matches)
            {
                config.Formatters.Remove(match);
            }

            config.Services.Replace(typeof(IExceptionHandler), new GlobalExceptionHandler());

            Helper.log.Debug("Register");
        }
    }
}
