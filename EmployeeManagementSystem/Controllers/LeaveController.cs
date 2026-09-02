using EmployeeManagementSystem.Entity;
using EmployeeManagementSystem.Service;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaveController : ControllerBase
    {
        private readonly LeaveService _service;

        public LeaveController(LeaveService service)
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
        public async Task<IActionResult> Save([FromBody] Leaves leave)
        {
            if (leave == null) return BadRequest();

            var saved = await _service.SaveAsync(leave);
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
