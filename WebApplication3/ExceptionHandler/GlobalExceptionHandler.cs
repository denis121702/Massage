using AngularJSAuthentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.ExceptionHandling;

namespace WebApplication3
{
    public class GlobalExceptionHandler : ExceptionHandler
    {
        public override void Handle(ExceptionHandlerContext context)
        {
            string erroeMessage = string.Format("GlobalExceptionHandler, Method: {0}, RequestUri: {1}, Message: {2} ",
               context.Request.Method.ToString(),
               context.Request.RequestUri.ToString(),
               context.Exception.Message);

            Helper.log.Error(erroeMessage);

            //if (context.Exception is ValidationException)
            //{
            //    //var resp = new HttpResponseMessage(HttpStatusCode.BadRequest)
            //    //{
            //    //    Content = new StringContent(context.Exception.Message),
            //    //    ReasonPhrase = "ValidationException"
            //    //};

            //    //context.Result = new ErrorMessageResult(context.Request, resp);
            //}
            //else
            //{
            //    // Do something here...
            //}
        }
    }
}