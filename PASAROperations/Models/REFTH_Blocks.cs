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
    
    public partial class REFTH_Blocks
    {
        public REFTH_Blocks()
        {
            this.REFTH_Shorts = new HashSet<REFTH_Shorts>();
        }
    
        public int REFTH_BlockId { get; set; }
        public int REFTH_BlockNo { get; set; }
    
        public virtual ICollection<REFTH_Shorts> REFTH_Shorts { get; set; }
    }
}
