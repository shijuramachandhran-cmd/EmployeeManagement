namespace EmployeeManagementSystem.Entity
{
    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public System.DateTime DOB { get; set; }
        public int DepartmentId { get; set; }
        public decimal Salary { get; set; }
        public string PhoneNumber { get; set; }
        public System.DateTime JoiningDate { get; set; }
        public string Designation { get; set; }
        public string Email { get; set; }
        public string Gender { get; set; }
    }
}
