using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication3.Contract
{
    public class UpdatePhotosRequest
    {
        /// <summary>
        /// Gets or sets the id
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// Gets or sets the Image
        /// </summary>
        public IList<PhotoData> PhotoDataList { get; set; }
    }
}