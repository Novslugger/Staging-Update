using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PASAROperations.Models
{
    public class AFRefPhase
    {
        public Nullable<System.DateTime> AF_StagePhase_StartDate { get; set; }
        public Nullable<System.DateTime> AF_StagePhase_EndDate { get; set; }
        public Nullable<System.Double> AF_StagePhase_Temperature { get; set; }
        public string AF_StagePhase_Delay { get; set; }


    }
}