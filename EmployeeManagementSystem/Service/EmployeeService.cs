using EmployeeManagementSystem.Data;
using EmployeeManagementSystem.Entity;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagementSystem.Service
{
    public class EmployeeService
    {
        private readonly AppDbContext _db;

        public EmployeeService(AppDbContext db)
        {
            _db = db;
        }

        public async Task<List<Employee>> GetAllAsync()
        {
            return await _db.Employees.AsNoTracking().ToListAsync();
        }

        public async Task<Employee> SaveAsync(Employee employee)
        {
            if (employee == null) return null;

            if (employee.Id == 0)
            {
                _db.Employees.Add(employee);
            }
            else
            {
                _db.Employees.Update(employee);
            }

            await _db.SaveChangesAsync();
            return employee;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var existing = await _db.Employees.FindAsync(id);
            if (existing == null) return false;

            _db.Employees.Remove(existing);
            await _db.SaveChangesAsync();
            return true;
        }
    }
}
