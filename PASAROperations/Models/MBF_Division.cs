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
    
    public partial class MBF_Division
    {
        public MBF_Division()
        {
            this.MBF_Param = new HashSet<MBF_Param>();
        }
    
        public int MBF_DIvisionId { get; set; }
        public string MBF_DIvisionName { get; set; }
    
        public virtual ICollection<MBF_Param> MBF_Param { get; set; }
    }
}