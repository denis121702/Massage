using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Http;
using WebApplication3.Contract;

namespace WebApplication3.Controllers
{    
    [RoutePrefix("api/Account")]
    public class AccountController : ApiController
    {
        [HttpGet]
        [AllowAnonymous]
        [Route("version")]        
        public IHttpActionResult Version()
        {
            return this.Ok("1111");
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("DeleteGirl")]
        public IHttpActionResult DeleteGirl(RequestDeleteGirl requestDeleteGirl)
        {
            var root = HttpContext.Current.Server.MapPath("~/FileUploads");
            string allGirlsFilePath = Path.Combine(root, "allGirls.json");
            if (!File.Exists(allGirlsFilePath))
            {
                using (StreamWriter w = File.AppendText(allGirlsFilePath))
                {
                }
            }
            string allGirlsText = File.ReadAllText(allGirlsFilePath);
            IList<PhotoDataGirlName> photoDataGirlNameList = JsonConvert.DeserializeObject<List<PhotoDataGirlName>>(allGirlsText)
                                                                            ?? new List<PhotoDataGirlName>();

            PhotoDataGirlName findGirl = photoDataGirlNameList.SingleOrDefault(m => m.Id == requestDeleteGirl.Id);
            if (findGirl != null)
            {                
                photoDataGirlNameList.Remove(findGirl);
            }

            string allGirlsJson = JsonConvert.SerializeObject(photoDataGirlNameList);
            File.WriteAllText(allGirlsFilePath, allGirlsJson);

            //--------------------------------------
            string filePath = Path.Combine(root, requestDeleteGirl.Id + ".json");
            if (File.Exists(filePath))
            {
                string girlText = File.ReadAllText(filePath);
                RequestSaveGirl girl = JsonConvert.DeserializeObject<RequestSaveGirl>(girlText)
                                                    ?? new RequestSaveGirl();
                
                // todo: remove //Application
                string rootPage = HttpContext.Current.Server.MapPath("~/Application");            
                string htmlGirlPagePath = Path.Combine(rootPage, girl.GirlPageName);                
                if (File.Exists(htmlGirlPagePath))
                {
                    File.Delete(htmlGirlPagePath);
                }                                

                File.Delete(filePath);
            }

            //--------------------------------------
            string filePathPhotos = Path.Combine(root, requestDeleteGirl.Id + "_photos.json");
            if (File.Exists(filePathPhotos))
            {

                string girlsPhotos = File.ReadAllText(filePathPhotos);
                IList<PhotoData> photoDataList = JsonConvert.DeserializeObject<List<PhotoData>>(girlsPhotos)
                                                    ?? new List<PhotoData>();
                foreach(PhotoData temp in photoDataList)
                {
                    string imageFilePath = Path.Combine(root, temp.Image);
                    if (File.Exists(imageFilePath))
                    {
                        File.Delete(imageFilePath);
                    }

                    string imageMediumFilePath = Path.Combine(root, "medium_" + temp.Image);
                    if (File.Exists(imageMediumFilePath))
                    {
                        File.Delete(imageMediumFilePath);
                    }
                }

                File.Delete(filePathPhotos);                
            }

            //--------------------------------------           

            return this.Ok(true);
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("SaveGirl")]
        public IHttpActionResult SaveGirl(RequestSaveGirl requestSaveGirl)
        {
            var root = HttpContext.Current.Server.MapPath("~/FileUploads");            
            string allGirlsFilePath = Path.Combine(root, "allGirls.json");            
            if (!File.Exists(allGirlsFilePath))
            {
                using (StreamWriter w = File.AppendText(allGirlsFilePath))
                {
                }
            }
            string allGirlsText = File.ReadAllText(allGirlsFilePath);
            IList<PhotoDataGirlName> photoDataGirlNameList = JsonConvert.DeserializeObject<List<PhotoDataGirlName>>(allGirlsText)
                                                                            ?? new List<PhotoDataGirlName>();
            if (requestSaveGirl.Id != Guid.Empty)
            {
                PhotoDataGirlName findGirl = photoDataGirlNameList.SingleOrDefault(m => m.Id == requestSaveGirl.Id);
                if (findGirl != null)
                {
                    findGirl.Girl = requestSaveGirl.Girl;
                    findGirl.GirlPageName = requestSaveGirl.GirlPageName = !string.IsNullOrEmpty(requestSaveGirl.Girl)
                                                                                ? "team_" + requestSaveGirl.Girl.Trim().Replace(" ", "_") + ".html" 
                                                                                : requestSaveGirl.Id.ToString() + ".html";
                }
                else
                {          
                    findGirl = new PhotoDataGirlName();
                    findGirl.Id = requestSaveGirl.Id = Guid.NewGuid();
                    findGirl.Girl = requestSaveGirl.Girl;
                    findGirl.GirlPageName = requestSaveGirl.GirlPageName = !string.IsNullOrEmpty(requestSaveGirl.Girl) 
                                                                                ? "team_" + requestSaveGirl.Girl.Trim().Replace(" ", "_") + ".html" 
                                                                                : requestSaveGirl.Id.ToString() + ".html";

                    photoDataGirlNameList.Add(findGirl);
                }
            }
            else
            {                
                PhotoDataGirlName findGirl = new PhotoDataGirlName();
                findGirl.Id = requestSaveGirl.Id = Guid.NewGuid();
                findGirl.Girl = requestSaveGirl.Girl;
                findGirl.GirlPageName = requestSaveGirl.GirlPageName = !string.IsNullOrEmpty(requestSaveGirl.Girl)
                                                                            ? "team_" + requestSaveGirl.Girl.Trim().Replace(" ", "_") + ".html" 
                                                                            : requestSaveGirl.Id.ToString() + ".html";

                photoDataGirlNameList.Add(findGirl);
            }

            string allGirlsJson = JsonConvert.SerializeObject(photoDataGirlNameList);
            File.WriteAllText(allGirlsFilePath, allGirlsJson);
            
            //--------------------------------------

            string filePath = Path.Combine(root, requestSaveGirl.Id + ".json");
            string json = JsonConvert.SerializeObject(requestSaveGirl);
            File.WriteAllText(filePath, json);            

            //--------------------------------------
            // todo: remove //Application
            string rootPage = HttpContext.Current.Server.MapPath("~/Application");            
            string htmlGirlPagePath = Path.Combine(rootPage, requestSaveGirl.GirlPageName);
            if (!File.Exists(htmlGirlPagePath) && !string.IsNullOrEmpty(requestSaveGirl.Girl))
            {
                string templateGirlPagePath = Path.Combine(root, "TemplateGirlPage.html");
                string templateGirlPage = File.ReadAllText(templateGirlPagePath);
                var replacedTitle = Regex.Replace(templateGirlPage, "{title}", requestSaveGirl.Girl);
                var replacedId = Regex.Replace(replacedTitle, "{id}", requestSaveGirl.Id.ToString());

                File.WriteAllText(htmlGirlPagePath, replacedId);
            }

            //--------------------------------------

            SaveGirlResponse saveGirlResponse = new SaveGirlResponse();
            saveGirlResponse.success = true;
            saveGirlResponse.id = requestSaveGirl.Id;

            return this.Ok(saveGirlResponse);
        }
       
        [HttpPost]
        [AllowAnonymous]
        [Route("Save")]
        public IHttpActionResult SavePage(RequestSaveText requestSaveText)
        {
            string json = JsonConvert.SerializeObject(requestSaveText.TextDataList);

            var root = HttpContext.Current.Server.MapPath("~/FileUploads");
            string filePath = Path.Combine(root, requestSaveText.Path.TrimStart('/') + ".json");                             
            File.WriteAllText(filePath, json);           

            //using (FileStream fs = new FileStream(medium, FileMode.OpenOrCreate))
            //{
            //    using (StreamWriter w = new StreamWriter(fs, Encoding.UTF8))
            //    {
            //        //w.Write(json);
            //        w.WriteLine("Test string");
            //        w.WriteLine('!');
            //    }
            //}

            return this.Ok("Save");
        }
    }
}