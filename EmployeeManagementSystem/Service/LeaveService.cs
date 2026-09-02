using EmployeeManagementSystem.Data;
using EmployeeManagementSystem.Entity;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagementSystem.Service
{
    public class LeaveService
    {
        private readonly AppDbContext _db;

        public LeaveService(AppDbContext db)
        {
            _db = db;
        }

        public async Task<List<Leaves>> GetAllAsync()
        {
            return await _db.Leaves.AsNoTracking().ToListAsync();
        }

        public async Task<Leaves> SaveAsync(Leaves leave)
        {
            if (leave == null) return null;

            if (leave.Id == 0)
            {
                _db.Leaves.Add(leave);
            }
            else
            {
                _db.Leaves.Update(leave);
            }

            await _db.SaveChangesAsync();
            return leave;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var existing = await _db.Leaves.FindAsync(id);
            if (existing == null) return false;

            _db.Leaves.Remove(existing);
            await _db.SaveChangesAsync();
            return true;
        }
    }
}
