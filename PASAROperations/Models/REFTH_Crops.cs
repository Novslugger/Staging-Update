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
    
    public partial class REFTH_Crops
    {
        public int REFTH_CropId { get; set; }
        public int REFTH_BlockPairId { get; set; }
        public int REFTH_CropNo { get; set; }
        public System.DateTime REFTH_DateStart { get; set; }
        public Nullable<System.DateTime> REFTH_DateEnd { get; set; }
        public Nullable<int> REFTH_StartShiftId { get; set; }
        public Nullable<decimal> REFTH_ElapsedKAH { get; set; }
        public Nullable<long> REFTH_CycleId { get; set; }
    }
}
