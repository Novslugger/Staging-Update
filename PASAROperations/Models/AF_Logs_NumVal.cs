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
    
    public partial class AF_Logs_NumVal
    {
        public int AF_Logs_NumValId { get; set; }
        public int AF_LotId { get; set; }
        public Nullable<int> ParamId { get; set; }
        public int AF_TimeLogId { get; set; }
        public double AF_Logs_NumVal1 { get; set; }
    
        public virtual AF_Lot AF_Lot { get; set; }
    }
}