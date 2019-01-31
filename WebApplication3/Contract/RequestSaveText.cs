using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication3.Contract
{
    public class RequestSaveText
    {
        public string Path { get; set; }

        public IList<TextData> TextDataList { get; set; }
    }
}