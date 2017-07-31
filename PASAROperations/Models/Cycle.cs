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
    
    public partial class Cycle
    {
        public Cycle()
        {
            this.CycleLogs = new HashSet<CycleLog>();
            this.Tuyeres = new HashSet<Tuyere>();
            this.CycleStages = new HashSet<CycleStage>();
            this.Activities = new HashSet<Activity>();
            this.EmployeeAssignStages = new HashSet<EmployeeAssignStage>();
            this.AF_BlisterReceive = new HashSet<AF_BlisterReceive>();
        }
    
        public int CycleId { get; set; }
        public int CycleNumber { get; set; }
        public int ConverterId { get; set; }
        public System.DateTime Cycle_Start_Time { get; set; }
        public Nullable<System.DateTime> Cycle_End_Time { get; set; }
        public int CycleStatId { get; set; }
        public int CampaignId { get; set; }
        public bool ActiveStatus { get; set; }
        public double CycleSulfur { get; set; }
        public int SilicaFormulaId { get; set; }
    
        public virtual Campaign Campaign { get; set; }
        public virtual Converter Converter { get; set; }
        public virtual CycleStat CycleStat { get; set; }
        public virtual ICollection<CycleLog> CycleLogs { get; set; }
        public virtual ICollection<Tuyere> Tuyeres { get; set; }
        public virtual ICollection<CycleStage> CycleStages { get; set; }
        public virtual ICollection<Activity> Activities { get; set; }
        public virtual SilicaFormula SilicaFormula { get; set; }
        public virtual ICollection<EmployeeAssignStage> EmployeeAssignStages { get; set; }
        public virtual ICollection<AF_BlisterReceive> AF_BlisterReceive { get; set; }
    }
}