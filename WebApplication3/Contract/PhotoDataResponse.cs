using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication3.Contract
{
    public class PhotoDataResponse
    {
        /// <summary>
        /// Success
        /// </summary>
        public Guid id { get; set; }

        /// <summary>
        /// Success
        /// </summary>
        public bool success { get; set; }

        /// <summary>
        /// Gets or sets the Image
        /// </summary>
        public IList<PhotoData> photos { get; set; }


    }
}