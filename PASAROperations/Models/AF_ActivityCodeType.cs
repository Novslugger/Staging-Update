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
    
    public partial class AF_ActivityCodeType
    {
        public AF_ActivityCodeType()
        {
            this.AF_ActivityCode = new HashSet<AF_ActivityCode>();
        }
    
        public int AF_ActivityCodeTypeId { get; set; }
        public string AF_ActivityCodeTypeName { get; set; }
    
        public virtual ICollection<AF_ActivityCode> AF_ActivityCode { get; set; }
    }
}