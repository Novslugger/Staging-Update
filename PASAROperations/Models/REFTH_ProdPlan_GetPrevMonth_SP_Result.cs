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
    
    public partial class REFTH_ProdPlan_GetPrevMonth_SP_Result
    {
        public int ResultId { get; set; }
        public Nullable<int> REFTH_BlockPairId { get; set; }
        public Nullable<int> REFTH_BlockNo { get; set; }
        public Nullable<System.DateTime> REFTH_ExchDate { get; set; }
        public Nullable<double> REFTH_ElapsedKAH { get; set; }
        public Nullable<int> NewCrop { get; set; }
        public Nullable<int> AnodeChargedMT { get; set; }
        public Nullable<int> AnodeWt { get; set; }
        public Nullable<double> CurrentEff { get; set; }
        public Nullable<double> RequiredKAH { get; set; }
        public Nullable<System.DateTime> RequiredKAHDateTime { get; set; }
        public Nullable<double> ScrapRatio { get; set; }
        public Nullable<double> NetKAH { get; set; }
    }
}
