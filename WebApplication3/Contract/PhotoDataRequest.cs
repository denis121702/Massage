using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication3.Contract
{
    public class PhotoDataRequest
    {
        /// <summary>
        /// Gets or sets the Girl
        /// </summary>
        public Guid Id { get; set; }      

        /// <summary>
        /// Gets or sets the Image
        /// </summary>
        public string Image { get; set; }
    }
}