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
    
    public partial class FSFE_RegularCrew
    {
        public int FSFE_RegularCrew_Id { get; set; }
        public int FSFE_Prod_Id { get; set; }
        public int FSFE_RegularCrew_Employee_Id { get; set; }
        public string FSFE_RegularCrew_Special_Activity { get; set; }
    
        public virtual FSFE_Prod FSFE_Prod { get; set; }
    }
}
