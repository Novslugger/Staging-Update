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
    
    public partial class TuyereState
    {
        public TuyereState()
        {
            this.Tuyeres = new HashSet<Tuyere>();
        }
    
        public int TuyereStateId { get; set; }
        public string Tuyere_State { get; set; }
        public string Tuyere_State_Symbol { get; set; }
    
        public virtual ICollection<Tuyere> Tuyeres { get; set; }
    }
}
