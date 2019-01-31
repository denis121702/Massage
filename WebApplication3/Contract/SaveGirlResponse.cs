using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication3.Contract
{
    public class SaveGirlResponse
    {
        /// <summary>
        /// Id
        /// </summary>
        public Guid id { get; set; }

        /// <summary>
        /// Success
        /// </summary>
        public bool success { get; set; }
    }
}