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
    
    public partial class FSFE_ActivityCode
    {
        public FSFE_ActivityCode()
        {
            this.FSFE_TimeLog = new HashSet<FSFE_TimeLog>();
        }
    
        public int FSFE_ActivityCodeId { get; set; }
        public string FSFE_ActivityCodeName { get; set; }
        public string FSFE_ActivityDesc { get; set; }
        public int FSFE_ActivityCodeTypeId { get; set; }
    
        public virtual FSFE_ActivityCodeType FSFE_ActivityCodeType { get; set; }
        public virtual ICollection<FSFE_TimeLog> FSFE_TimeLog { get; set; }
    }
}