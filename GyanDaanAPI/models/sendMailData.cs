using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GyanDaanAPI.models
{
    public class sendMailData
    {
        public string studentEmail { get; set; }
        public string mentorEmail { get; set; }
        public string myGyan { get; set; }
        public string topic { get; set; }
        public string startTime { get; set; }
        public string endTime { get; set; }
        public string link { get; set; }
    }
}
