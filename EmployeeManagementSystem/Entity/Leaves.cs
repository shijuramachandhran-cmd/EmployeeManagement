using System;

namespace EmployeeManagementSystem.Entity
{
    public class Leaves
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public string LeaveType { get; set; }
        public string Reason { get; set; }
        public DateTime Date { get; set; }
        public string Status { get; set; }
    }
}
