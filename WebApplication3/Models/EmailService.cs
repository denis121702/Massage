
using System.Collections.ObjectModel;
using System.Collections.Specialized;
using System.IO;
using System.Net.Http;
using System.Net.Mail;
using System.Text;
using System.Web.Mail;
namespace WebApplication3.Models
{
    public class EmailService
    {
        public static string EmailEmpty = "emailempty.jpg";

        public static string infoMassageLounge = "info@massage-lounge-duesseldorf.de";
        public static string aksanaEmail = "libraro@mail.ru";

        public EmailService()
        {
        }
        

        public string ConvertToEmail(NameValueCollection nameValueCollection)
        {
            StringBuilder stringBuilder = new StringBuilder();
            foreach (var key in nameValueCollection.AllKeys)
            {
                foreach (var val in nameValueCollection.GetValues(key))
                {
                    stringBuilder.AppendLine(string.Format("{0}: {1} <br />", key, val));
                }
            }

            return stringBuilder.ToString();
        }

        public string ConvertToFile(Collection<MultipartFileData> multipartFileData)
        {
            StringBuilder stringBuilder = new StringBuilder();            

            int i = 1;
            // This illustrates how to get the file names.
            foreach (MultipartFileData file in multipartFileData)
            {
                //string fileName = file.Headers.ContentDisposition.FileName.Replace("\"", string.Empty);
                string fileName = Path.GetFileName(file.LocalFileName);
                if (!string.IsNullOrEmpty(fileName) && EmailEmpty != fileName)
                {                    
                    string url = string.Format("http://www.massage-lounge-duesseldorf.de/FileUploads/{0}", fileName);
                    stringBuilder.AppendLine(string.Format("File{0} Link: {1} <br />", i++, url));
                }
            }

            return stringBuilder.ToString();
        }

        public void SendMailBewerbung(string email, string file)
        {
            string subject = string.Format(@"Bewerbung wurde erfolgreich versendet: <br /><br />
                                            {0} <br />
                                            {1} <br />
                                            ----------------------------------------------------------- <br />
                                            <font color=#336699><b>www.massage-lounge-duesseldorf.de</b></font><br />", email, file);

            const string SERVER = "relay-hosting.secureserver.net";
            System.Net.Mail.MailMessage oMail = new System.Net.Mail.MailMessage();
            oMail.From = new MailAddress("info@dennis-gladun.de");
            oMail.To.Add(infoMassageLounge);
            oMail.To.Add(aksanaEmail);
            oMail.Subject = "Bewerbung";
            oMail.IsBodyHtml = true; // enumeration
            oMail.Priority = System.Net.Mail.MailPriority.High; // enumeration
            oMail.Body = subject;
            SmtpClient Client = new SmtpClient(SERVER);
            Client.Send(oMail);
        }

        public void SendMailOnlinebuchung(string email)
        {
            string subject = string.Format(@"Onlinebuchung wurde erfolgreich versendet: <br /><br />
                                            {0} <br />                                            
                                            ----------------------------------------------------------- <br />
                                            <font color=#336699><b>www.massage-lounge-duesseldorf.de</b></font><br />", email);

            const string SERVER = "relay-hosting.secureserver.net";
            System.Net.Mail.MailMessage oMail = new System.Net.Mail.MailMessage();
            oMail.From = new MailAddress("info@dennis-gladun.de");
            oMail.To.Add(infoMassageLounge);
            oMail.To.Add(aksanaEmail);
            oMail.Subject = "Onlinebuchung";
            oMail.IsBodyHtml = true; // enumeration
            oMail.Priority = System.Net.Mail.MailPriority.High; // enumeration
            oMail.Body = subject;
            SmtpClient Client = new SmtpClient(SERVER);
            Client.Send(oMail);
        }     
    }
}