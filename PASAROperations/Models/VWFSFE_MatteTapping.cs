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
    
    public partial class VWFSFE_MatteTapping
    {
        public Nullable<long> Event { get; set; }
        public int FSFE_MatteTapId { get; set; }
        public int FSFE_Prod_Id { get; set; }
        public System.DateTime FSFE_Matte_StartDate { get; set; }
        public Nullable<System.DateTime> FSFE_Matte_EndDate { get; set; }
        public int FSFE_Launder1 { get; set; }
        public Nullable<int> FSFE_Launder2 { get; set; }
        public string Launder { get; set; }
        public string Mtapper1 { get; set; }
        public string Mtapper2 { get; set; }
        public string Mtapper { get; set; }
        public double MatteTemp { get; set; }
        public double MatteVolume { get; set; }
        public Nullable<System.DateTime> FSFE_Matte_CalledDate { get; set; }
        public Nullable<int> FSFE_Matte_CFNo { get; set; }
        public Nullable<int> FSFE_Matte_SlagBlow { get; set; }
    }
}
