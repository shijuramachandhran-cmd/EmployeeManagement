using EmployeeManagementSystem.Entity;
using EmployeeManagementSystem.Service;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly DepartmentService _service;

        public DepartmentController(DepartmentService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> List()
        {
            var list = await _service.GetAllAsync();
            return Ok(list);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDepartment(int id)
        {
            var department = await _service.GetDepartmentById(id);
            if (department == null)
                return NotFound();
            else
            return Ok(department);
        }

        [HttpPost("save")]
        public async Task<IActionResult> SaveDepartment([FromBody] Department department)
        {
            if (department == null) return BadRequest();

            var saved = await _service.SaveAsync(department);
            return Ok(saved);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var ok = await _service.DeleteAsync(id);
            if (!ok) return NotFound();
            return NoContent();
        }
    }
}
