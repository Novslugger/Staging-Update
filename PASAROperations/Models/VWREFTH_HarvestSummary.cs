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
    
    public partial class VWREFTH_HarvestSummary
    {
        public int REFTH_HarvestSummaryId { get; set; }
        public System.DateTime REFTH_ProductionDate { get; set; }
        public Nullable<double> REFTH_DK_TH1 { get; set; }
        public Nullable<double> REFTH_DK_TH2 { get; set; }
        public Nullable<double> REFTH_CathodeProd_TH1 { get; set; }
        public Nullable<double> REFTH_CathodeProd_TH2 { get; set; }
        public Nullable<double> REFTH_PowerConsumption_CC1 { get; set; }
        public Nullable<double> REFTH_PowerConsumption_CC2 { get; set; }
        public Nullable<double> REFTH_Voltage_CC1 { get; set; }
        public Nullable<double> REFTH_Voltage_CC2 { get; set; }
        public Nullable<int> REFTH_WorkingCells_TH1 { get; set; }
        public Nullable<int> REFTH_WorkingCells_TH2 { get; set; }
        public Nullable<double> REFTH_AHx100 { get; set; }
        public Nullable<double> REFTH_AdjCellHrs_TH1 { get; set; }
        public Nullable<double> REFTH_AdjCellHrs_TH2 { get; set; }
        public Nullable<double> REFTH_AdjCellHrs_Combined { get; set; }
        public string MonthYear { get; set; }
    }
}
