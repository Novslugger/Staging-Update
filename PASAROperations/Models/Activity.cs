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
    
    public partial class Activity
    {
        public Activity()
        {
            this.SilicaFormulaVariables = new HashSet<SilicaFormulaVariable>();
        }
    
        public int ActivityId { get; set; }
        public int CycleId { get; set; }
        public int ActSequence { get; set; }
        public int ActivityCodeId { get; set; }
        public double ActDuration { get; set; }
        public double FSFE_Quantity { get; set; }
        public double CF_Quantity { get; set; }
        public double AF_Quantity { get; set; }
        public string ActComment { get; set; }
        public int StageId { get; set; }
        public bool ActivityStatus { get; set; }
        public int ActivityMode { get; set; }
    
        public virtual ActivityCode ActivityCode { get; set; }
        public virtual Cycle Cycle { get; set; }
        public virtual Stage Stage { get; set; }
        public virtual ICollection<SilicaFormulaVariable> SilicaFormulaVariables { get; set; }
    }
}
