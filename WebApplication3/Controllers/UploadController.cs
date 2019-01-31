using AngularJSAuthentication;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Net.Mail;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Mail;
using WebApplication3.Models;

namespace WebApplication3.Controllers
{
    public class UploadController : ApiController
    {       
        [HttpPost]
        public HttpResponseMessage OnlineBooking(FormDataCollection formbody)       
        {                       
            try
            {
                var formData = formbody.ReadAsNameValueCollection();

                EmailService emailService = new EmailService();

                string email = emailService.ConvertToEmail(formData);

                emailService.SendMailOnlinebuchung(email);                

                var response = Request.CreateResponse(HttpStatusCode.Moved);
                response.Headers.Location = new Uri("http://www.massage-lounge-duesseldorf.de/onlineBookingsuccess.html");
                //response.Headers.Location = new Uri("http://localhost:51010/Application/onlinebookingsuccess.html");
                return response;

            }
            catch (System.Exception e)
            {
                string erroeMessage = string.Format("Message: {0}, Source: {1}, InnerException: {2} ",
                e.Message,
                e.Source,
                e.InnerException);

                Helper.log.Debug(erroeMessage);

                //return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);

                var response = Request.CreateResponse(HttpStatusCode.Moved);
                response.Headers.Location = new Uri("http://www.massage-lounge-duesseldorf.de/404.html");
                //response.Headers.Location = new Uri("http://localhost:51010/404.html");
                return response;
            }
        }

        public async Task<HttpResponseMessage> PostData()
        {            
            // Check if the request contains multipart/form-data.
            if (!Request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }

            string root = HttpContext.Current.Server.MapPath("~/FileUploads");
            //var provider = new MultipartFormDataStreamProvider(root);         

            try
            {
                var provider = this.GetMultipartProvider(root);

                await Request.Content.ReadAsMultipartAsync(provider);

                EmailService emailService = new EmailService();

                string email = emailService.ConvertToEmail(provider.FormData);                                
                string file = emailService.ConvertToFile(provider.FileData);

                emailService.SendMailBewerbung(email, file);
                   
                //return Request.CreateResponse(HttpStatusCode.OK);

                var response = Request.CreateResponse(HttpStatusCode.Moved);
                response.Headers.Location = new Uri("http://www.massage-lounge-duesseldorf.de/uploadsuccess.html");
                //response.Headers.Location = new Uri("http://localhost:51010/Application/uploadsuccess.html");
                return response;

            }
            catch (System.Exception e)
            {
                string erroeMessage = string.Format("Message: {0}, Source: {1}, InnerException: {2} ",
                e.Message,
                e.Source,
                e.InnerException);

                Helper.log.Debug(erroeMessage);

                //return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);

                var response = Request.CreateResponse(HttpStatusCode.Moved);
                response.Headers.Location = new Uri("http://www.massage-lounge-duesseldorf.de/404.html");
                //response.Headers.Location = new Uri("http://localhost:51010/404.html");
                return response;
            }
        }

        private CustomMultipartFormDataStreamProvider GetMultipartProvider(string root)
        {
            return new CustomMultipartFormDataStreamProvider(root);
        }

        public class CustomMultipartFormDataStreamProvider : MultipartFormDataStreamProvider
        {
            public CustomMultipartFormDataStreamProvider(string path)
                : base(path)
            { }

            public override string GetLocalFileName(System.Net.Http.Headers.HttpContentHeaders headers)
            {               
                string tempName = headers.ContentDisposition.FileName.Replace("\"", string.Empty);

                if(string.IsNullOrEmpty(tempName))
                {
                    return EmailService.EmailEmpty;
                }

                string fileExtension = Path.HasExtension(tempName) ? Path.GetExtension(tempName) : ".jpg";

                return Guid.NewGuid() + fileExtension;                
            }
        }
    }
}
