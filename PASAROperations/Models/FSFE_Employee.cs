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
    
    public partial class FSFE_Employee
    {
        public Nullable<int> EmployeeId { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Middlename { get; set; }
        public string Fullname { get; set; }
        public Nullable<int> CompanyId { get; set; }
        public Nullable<int> DepartmentId { get; set; }
        public int PositionId { get; set; }
        public string EmailAddress { get; set; }
        public string ADusername { get; set; }
    }
}
