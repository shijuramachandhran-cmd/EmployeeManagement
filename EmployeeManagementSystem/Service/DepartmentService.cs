using EmployeeManagementSystem.Data;
using EmployeeManagementSystem.Entity;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagementSystem.Service
{
    public class DepartmentService
    {
        private readonly AppDbContext _db;

        public DepartmentService(AppDbContext db)
        {
            _db = db;
        }

        public async Task<IEnumerable<Department>> GetAllAsync()
        {
            return await _db.Departments.AsNoTracking().ToListAsync();
        }
        public async Task<Department?> GetDepartmentById(int id)
        {
            return await _db.Departments.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Department> SaveAsync(Department department)
        {
            if (department == null) return null;

            if (department.Id == 0)
            {
                _db.Departments.Add(department);
            }
            else
            {
                _db.Departments.Update(department);
            }

            await _db.SaveChangesAsync();
            return department;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var existing = await _db.Departments.FindAsync(id);
            if (existing == null) return false;

            _db.Departments.Remove(existing);
            await _db.SaveChangesAsync();
            return true;
        }
    }
}
