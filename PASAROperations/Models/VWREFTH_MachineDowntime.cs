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
    
    public partial class VWREFTH_MachineDowntime
    {
        public int REFTH_MachineDowntimeId { get; set; }
        public System.DateTime REFTH_MDDate { get; set; }
        public int REFTH_MDMachineId { get; set; }
        public string REFTH_MachineCode { get; set; }
        public string REFTH_MachineDesc { get; set; }
        public int REFTH_MDReasonId { get; set; }
        public string REFTH_MDReasonCode { get; set; }
        public string REFTH_MDReasonDesc { get; set; }
        public System.DateTime REFTH_MDStartTime { get; set; }
        public System.DateTime REFTH_MDEndTime { get; set; }
        public decimal REFTH_MDDowntimeMin { get; set; }
        public string REFTH_MDRemarks { get; set; }
    }
}
