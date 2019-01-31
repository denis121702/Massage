using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication3.Contract
{
    public class RequestSaveGirl
    {
        public Guid Id { get; set; }

        public string Girl { get; set; }        

        public IList<TextData> TextDataList { get; set; }

        /// <summary>
        /// GirlPageName
        /// </summary>
        public string GirlPageName { get; set; }
    }
}