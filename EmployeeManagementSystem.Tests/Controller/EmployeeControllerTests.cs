using EmployeeManagementSystem.Controllers;
using EmployeeManagementSystem.Entity;
using EmployeeManagementSystem.Service;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace EmployeeManagementSystem.Tests.Controller
{
    public class EmployeeControllerTests
    {
        private readonly Mock<IEmployeeService> _serviceMock;
        private readonly EmployeeController _controller;

        public EmployeeControllerTests()
        {
            // Arrange - create mock service
            _serviceMock = new Mock<IEmployeeService>();

            // Create controller and inject mocked service
            _controller = new EmployeeController(_serviceMock.Object);
        }

        [Fact]
        public async Task List_ReturnsOkResult_WhenEmployeesExist()
        {
            // Arrange
            var employees = new List<Employee>
            {
                new Employee
                {
                    Id = 1
                    // Add your other Employee properties here
                },
                new Employee
                {
                    Id = 2
                    // Add your other Employee properties here
                }
            };

            _serviceMock
                .Setup(x => x.GetAllAsync())
                .ReturnsAsync(employees);

            // Act
            var result = await _controller.List();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);

            var returnedEmployees =
                Assert.IsType<List<Employee>>(okResult.Value);

            Assert.Equal(2, returnedEmployees.Count);
        }
    }
}
