using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using WebApplication3.Contract;
using WebApplication3.Help;

namespace WebApplication3.Controllers
{
    [RoutePrefix("api/files")]
    public class FilesController : ApiController
    {
        [HttpPost]
        [Route("UpdatePhotos")]
        public IHttpActionResult UpdatePhotos(UpdatePhotosRequest photoDataRequest)
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

            PhotoDataGirlName findGirl = photoDataGirlNameList.SingleOrDefault(m => m.Id == photoDataRequest.Id);
            if (findGirl != null)
            {
                findGirl.Image = photoDataRequest.PhotoDataList.Where(m => m.IsMain == true).Select(m => m.Image).FirstOrDefault()
                                            ?? photoDataRequest.PhotoDataList.Select(m => m.Image).FirstOrDefault()
                                            ?? string.Empty;
            }

            string allGirlsJson = JsonConvert.SerializeObject(photoDataGirlNameList);
            File.WriteAllText(allGirlsFilePath, allGirlsJson);

            //---------------------------------------------------------

            string filePath = Path.Combine(root, photoDataRequest.Id + "_photos.json");
            string json = JsonConvert.SerializeObject(photoDataRequest.PhotoDataList);
            File.WriteAllText(filePath, json);

            return this.Ok(true);
        }

        [HttpPost]
        [Route("DeletePhoto")]
        public IHttpActionResult DeletePhoto(PhotoDataRequest photoDataRequest)
        {
            var root = HttpContext.Current.Server.MapPath("~/FileUploads");
            
            string filePath = Path.Combine(root, photoDataRequest.Id + "_photos.json");
            if (!File.Exists(filePath))
            {
                using (StreamWriter w = File.AppendText(filePath))
                {
                }
            }

            string girlsText = File.ReadAllText(filePath);
            IList<PhotoData> photoDataList = JsonConvert.DeserializeObject<List<PhotoData>>(girlsText)
                                                        ?? new List<PhotoData>();

            PhotoData photoData = photoDataList.SingleOrDefault(m => m.Image == photoDataRequest.Image);
            if (photoData != null)
            {
                string imageFilePath = Path.Combine(root, photoData.Image);
                if (File.Exists(imageFilePath))
                {
                    File.Delete(imageFilePath);
                }

                string imageMediumFilePath = Path.Combine(root, "medium_" + photoData.Image);
                if (File.Exists(imageMediumFilePath))
                {
                    File.Delete(imageMediumFilePath);
                }

                photoDataList.Remove(photoData);
            }

            string json = JsonConvert.SerializeObject(photoDataList);
            File.WriteAllText(filePath, json);

            //---------------------------------------------------------

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

            PhotoDataGirlName findGirl = photoDataGirlNameList.SingleOrDefault(m => m.Id == photoDataRequest.Id);
            if (findGirl != null)
            {
                findGirl.Image = photoDataList.Where(m => m.IsMain == true).Select(m => m.Image).FirstOrDefault() 
                                        ?? photoDataList.Select(m => m.Image).FirstOrDefault()
                                        ?? string.Empty;
            }

            string allGirlsJson = JsonConvert.SerializeObject(photoDataGirlNameList);
            File.WriteAllText(allGirlsFilePath, allGirlsJson);           

            return this.Ok(true);
        }

        [HttpPost]
        [Route("AddPhoto")]
        public IHttpActionResult AddPhoto(PhotoDataRequest photoDataRequest)
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
            if (photoDataRequest.Id != Guid.Empty)
            {
                PhotoDataGirlName findGirl = photoDataGirlNameList.SingleOrDefault(m => m.Id == photoDataRequest.Id);
                if (findGirl != null)
                {
                    findGirl.Image = photoDataRequest.Image;
                }
                else
                {
                    findGirl = new PhotoDataGirlName();
                    findGirl.Id = photoDataRequest.Id = Guid.NewGuid();
                    findGirl.Image = photoDataRequest.Image;

                    photoDataGirlNameList.Add(findGirl);
                }
            }
            else
            {
                PhotoDataGirlName findGirl = new PhotoDataGirlName();
                findGirl.Id = photoDataRequest.Id = Guid.NewGuid();
                findGirl.Image = photoDataRequest.Image;

                photoDataGirlNameList.Add(findGirl);
            }

            string allGirlsJson = JsonConvert.SerializeObject(photoDataGirlNameList);
            File.WriteAllText(allGirlsFilePath, allGirlsJson);

            //---------------------------------------------------------

            string filePath = Path.Combine(root, photoDataRequest.Id + "_photos.json");
            if (!File.Exists(filePath))
            {
                using (StreamWriter w = File.AppendText(filePath))
                { 
                }
            }

            string girlsText = File.ReadAllText(filePath);
            IList<PhotoData> photoDataList = JsonConvert.DeserializeObject<List<PhotoData>>(girlsText) 
                                                ?? new List<PhotoData>();
            PhotoData photoData = new PhotoData
            {
                Image = photoDataRequest.Image,
                IsMain = true
            };
            photoDataList.Add(photoData);

            string json = JsonConvert.SerializeObject(photoDataList);            
            File.WriteAllText(filePath, json);

            PhotoDataResponse photoDataResponse = new PhotoDataResponse();
            photoDataResponse.success = true;
            photoDataResponse.photos = photoDataList;
            photoDataResponse.id = photoDataRequest.Id;

            return Ok(photoDataResponse);
        }

        [HttpPost]
        [Route("Upload")]
        public async Task<HttpResponseMessage> Upload()
        {
            if (!Request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }

            List<string> files = new List<string>();

            try
            {
                var root = HttpContext.Current.Server.MapPath("~/FileUploads");

                var streamProvider = this.GetMultipartProvider(root);

                // Read the MIME multipart content using the stream provider we just created.
                await Request.Content.ReadAsMultipartAsync(streamProvider);

                foreach (MultipartFileData file in streamProvider.FileData)
                {
                    //string medium = Path.Combine(root, "medium_" + Path.GetFileName(file.LocalFileName));
                    string medium = Path.Combine(root, "medium_" + Path.GetFileName(file.LocalFileName));

                    ImageTools.Resize(file.LocalFileName, medium, 190, 190, true);

                    files.Add(file.LocalFileName);
                }

                // Send OK Response along with saved file names to the client. 
                return Request.CreateResponse(HttpStatusCode.OK, Path.GetFileName(files.First()));
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }
        }

        // You could extract these two private methods to a separate utility class since
        // they do not really belong to a controller class but that is up to you
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
                //var name = !string.IsNullOrWhiteSpace(headers.ContentDisposition.FileName)
                //    ? Guid.NewGuid() + "_" + headers.ContentDisposition.FileName
                //    : "NoName";

                string tempName = headers.ContentDisposition.FileName.Replace("\"", string.Empty);
                string fileExtension = Path.HasExtension(tempName) ? Path.GetExtension(tempName) : ".jpg";

                return Guid.NewGuid() + fileExtension;
            }
        }
    }    
}