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
    
    public partial class AF_Customer_Val
    {
        public int AF_CustomerValId { get; set; }
        public int AF_LotId { get; set; }
        public int AF_CWId { get; set; }
        public int AF_CustomerId { get; set; }
        public Nullable<int> AF_CustomerId_Othr { get; set; }
        public Nullable<double> AF_Customer_TotWeight { get; set; }
        public Nullable<double> AF_Customer_TotWeight_Othr { get; set; }
        public Nullable<System.DateTime> AF_ProductionDate { get; set; }
    
        public virtual AF_CastingWheel AF_CastingWheel { get; set; }
        public virtual AF_Customer AF_Customer { get; set; }
        public virtual AF_Lot AF_Lot { get; set; }
    }
}
