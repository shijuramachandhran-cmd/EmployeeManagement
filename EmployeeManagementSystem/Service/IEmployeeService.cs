using EmployeeManagementSystem.Entity;

namespace EmployeeManagementSystem.Service
{
    public interface IEmployeeService
    {
        Task<List<Employee>> GetAllAsync();

        Task<Employee> SaveAsync(Employee employee);

        Task<bool> DeleteAsync(int id);
    }
}