//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace PASAROperations.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class VWAF_BlisterReceive
    {
        public int AF_BlisterReceiveId { get; set; }
        public System.DateTime AF_BlisterReceive_StartTime { get; set; }
        public System.DateTime AF_BlisterReceive_EndTime { get; set; }
        public int AF_LotId { get; set; }
        public int CycleId { get; set; }
        public double AF_BlisterReceive_Temp { get; set; }
        public double AF_BlisterReceive_Wt { get; set; }
        public Nullable<int> CycleNumber { get; set; }
        public string ConverterName { get; set; }
        public Nullable<double> CycleSulfur { get; set; }
        public Nullable<int> CampaignId { get; set; }
        public Nullable<int> ConverterId { get; set; }
    }
}
