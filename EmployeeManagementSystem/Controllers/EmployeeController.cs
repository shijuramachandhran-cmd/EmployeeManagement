using EmployeeManagementSystem.Entity;
using EmployeeManagementSystem.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeService _service;

        public EmployeeController(EmployeeService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> List()
        {
            var list = await _service.GetAllAsync();
            return Ok(list);
        }

        [HttpPost("save")]
        public async Task<IActionResult> Save([FromBody] Employee employee)
        {
            if (employee == null) return BadRequest();

            var saved = await _service.SaveAsync(employee);
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
