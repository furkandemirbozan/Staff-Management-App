using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using staffmanagament.BUSINESS;
using staffmanagament.BUSINESS.Interfaces;
using staffmanagament.CORE;
using staffmanagament.CORE.DTOs;
using staffmanagament.CORE.Interfaces;
using staffmanagament.CORE.Models;
using staffmanagament.DAL;
using System.Security.Claims;

namespace staffmanagament.API.Controllers
{
    [Authorize(Roles = "CompanyManager")]
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IUserRepository _userRepository;
        private readonly ISalaryService _salaryService;
        private readonly AppDbContext _context;
        private readonly IEmployeeServices _employeeService;

        public EmployeeController(IEmployeeRepository employeeRepository, IUserRepository userRepository, ISalaryService salaryService, AppDbContext context, IEmployeeServices employeeService)
        {
            _employeeRepository = employeeRepository;
            _userRepository = userRepository;
            _salaryService = salaryService;
            _context = context;
            _employeeService = employeeService;
        }


        // GET: api/Employee
        [Authorize(Roles = "CompanyOwner,CompanyManager,CompanyUser")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GetEmployeeDto>>> GetEmployees()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _userRepository.GetByIdAsync(int.Parse(userId));

            if (user == null || user.CompanyId == null)
            {
                return BadRequest("User or CompanyId not found.");
            }

            var employees = await _context.Employees.Where(e => e.CompanyId == user.CompanyId).Where(e => e.isActive == true).ToListAsync();
            var getEmployeeDTOs = employees.Select(e => new GetEmployeeDto
            {
                Id = e.Id,
                FirstName = e.FirstName,
                LastName = e.LastName,
                Email = e.Email,
                HireDate = e.HireDate,
                BirthDate = e.BirthDate,
                PhoneNumber = e.PhoneNumber,
                RemainingLeaveDays = e.RemainingLeaveDays,
                EducationLevelId = e.EducationLevelId,
                GenderId = e.GenderId,
                JobId = e.JobId,
                DepartmentId = e.DepartmentId,
                isActive = e.isActive,
                UserId = e.UserId
            }).ToList();

            return Ok(getEmployeeDTOs);
        }
        // GET: api/Employee/5

        [Authorize(Roles = "CompanyOwner,CompanyManager")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _userRepository.GetByIdAsync(int.Parse(userId));

            if (user == null || user.CompanyId == null)
            {
                return BadRequest("User or CompanyId not found.");
            }

            var employee = await _employeeRepository.GetByIdAsync(id);
            if (employee == null || employee.CompanyId != user.CompanyId)
            {
                return NotFound();
            }

            return Ok(employee);
        }

        // POST: api/Employee
        [Authorize(Roles = "CompanyOwner,CompanyManager")]
        [HttpPost]
        public async Task<ActionResult<CreateEmployeeDto>> PostEmployee(CreateEmployeeDto createEmployeeDto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _userRepository.GetByIdAsync(int.Parse(userId));

            if (user == null || user.CompanyId == null)
            {
                return BadRequest("User or CompanyId not found.");
            }

            var employee = new Employee
            {
                FirstName = createEmployeeDto.FirstName,
                LastName = createEmployeeDto.LastName,
                Email = createEmployeeDto.Email,
                HireDate = createEmployeeDto.HireDate,
                BirthDate = createEmployeeDto.BirthDate,
                PhoneNumber = createEmployeeDto.PhoneNumber,
                RemainingLeaveDays = createEmployeeDto.RemainingLeaveDays,
                EducationLevelId = createEmployeeDto.EducationLevelId,
                GenderId = createEmployeeDto.GenderId,
                JobId = createEmployeeDto.JobId,
                DepartmentId = createEmployeeDto.DepartmentId,
                isActive = createEmployeeDto.isActive,
                UserId = createEmployeeDto.UserId,
                CompanyId = user.CompanyId.Value,
                Resume = new Resume
                {
                    Path = createEmployeeDto.CreateResumeDto.Path,
                    CompanyId = user.CompanyId.Value,
                },
                Salary = new Salary
                {
                    Amount = (decimal)createEmployeeDto.SalaryDto.Amount,
                },
                Address = new Address
                {
                    StreetAddress = createEmployeeDto.createAddressDto.StreetAddress,
                    PostalCode = createEmployeeDto.createAddressDto.PostalCode,
                    City = createEmployeeDto.createAddressDto.City,
                    State = createEmployeeDto.createAddressDto.State,
                    Country = createEmployeeDto.createAddressDto.Country,
                }
            };

            await _employeeRepository.AddAsync(employee);

            return createEmployeeDto;
        }

        // PUT: api/Employee/5
        [Authorize(Roles = "CompanyOwner,CompanyManager")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(int id, UpdateEmployeeDto updateEmployeeDto)
        {
            if (id != updateEmployeeDto.Id)
            {
                return BadRequest();
            }

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _userRepository.GetByIdAsync(int.Parse(userId));

            if (user == null || user.CompanyId == null)
            {
                return BadRequest("User or CompanyId not found.");
            }

            var employee = await _employeeRepository.GetByIdAsync(id);
            if (employee == null || employee.CompanyId != user.CompanyId)
            {
                return NotFound();
            }

            if (updateEmployeeDto.FirstName != null)
                employee.FirstName = updateEmployeeDto.FirstName;
            if (updateEmployeeDto.LastName != null)
                employee.LastName = updateEmployeeDto.LastName;
            if (updateEmployeeDto.Email != null)
                employee.Email = updateEmployeeDto.Email;
            if (updateEmployeeDto.HireDate != null)
                employee.HireDate = (DateTime)updateEmployeeDto.HireDate;
            if (updateEmployeeDto.BirthDate != null)
                employee.BirthDate = (DateTime)updateEmployeeDto.BirthDate;
            if (updateEmployeeDto.PhoneNumber != null)
                employee.PhoneNumber = updateEmployeeDto.PhoneNumber;
            if (updateEmployeeDto.RemainingLeaveDays != null)
                employee.RemainingLeaveDays = (int)updateEmployeeDto.RemainingLeaveDays;
            if (updateEmployeeDto.EducationLevelId != null)
                employee.EducationLevelId = (int)updateEmployeeDto.EducationLevelId;
            if (updateEmployeeDto.GenderId != null)
                employee.GenderId = (int)updateEmployeeDto.GenderId;
            if (updateEmployeeDto.JobId != null)
                employee.JobId = (int)updateEmployeeDto.JobId;
            if (updateEmployeeDto.DepartmentId != null)
                employee.DepartmentId = (int)updateEmployeeDto.DepartmentId;
            if (updateEmployeeDto.isActive != null)
                employee.isActive = (bool)updateEmployeeDto.isActive;
            if (updateEmployeeDto.UserId != null)
                employee.UserId = updateEmployeeDto.UserId;


            await _employeeRepository.UpdateAsync(employee);
            return Ok("Employee updated successfully.");
        }

        // DELETE: api/Employee/5
        [Authorize(Roles = "CompanyOwner,CompanyManager")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _employeeRepository.GetByIdAsync(id);
            employee.isActive = false;
            await _employeeRepository.UpdateAsync(employee);

            return Ok("Employee deleted successfully.");
        }

        // GET: api/Employee/5/salaries
        [Authorize(Roles = "CompanyOwner,CompanyManager")]
        [HttpGet("{id}/salaries")]
        public async Task<ActionResult<IEnumerable<SalaryDto>>> GetSalaries(int id)
        {
            var salaries = await _salaryService.GetSalaries();
            var employeeSalaries = salaries.Where(s => s.EmployeeId == id);

            return Ok(employeeSalaries);
        }

        // POST: api/Employee/{id}/salaries
        [Authorize(Roles = "CompanyOwner,CompanyManager")]
        [HttpPost("{id}/salaries")]
        public async Task<ActionResult<SalaryDto>> PostSalary(int id, SalaryDto salaryDto)
        {
            if (id != salaryDto.EmployeeId)
            {
                return BadRequest("Employee ID mismatch.");
            }

            var employee = await _employeeRepository.GetByIdAsync((int)salaryDto.EmployeeId);
            if (employee == null)
            {
                return NotFound("Employee not found.");
            }
            if (employee.Salary.Id != null)
            {
                return BadRequest("Employee already has a salary.");
            }

            var salary = await _salaryService.AddSalary(salaryDto);
            return CreatedAtAction(nameof(GetSalaries), new { id = salary.EmployeeId }, salary);
        }

        // PUT: api/Employee/5/salaries/1
        [Authorize(Roles = "CompanyOwner,CompanyManager")]
        [HttpPut("{employeeId}/salaries")]
        public async Task<IActionResult> PutSalary(int employeeId, SalaryDto salaryDto)
        {
            if (employeeId != salaryDto.EmployeeId)
            {
                return BadRequest("Employee ID mismatch.");
            }

            // var employee = await _employeeRepository.GetByIdAsync(employeeId);
            var employee = await _context.Employees.Include(e => e.Salary).FirstOrDefaultAsync(e => e.Id == employeeId);
            employee.Salary.Amount = (decimal)salaryDto.Amount;
            await _context.SaveChangesAsync();

            return Ok();
        }

        // DELETE: api/Employee/5/salaries/1
        [Authorize(Roles = "CompanyOwner,CompanyManager")]
        [HttpDelete("{employeeId}/salaries/{salaryId}")]
        public async Task<IActionResult> DeleteSalary(int employeeId, int salaryId)
        {
            var salary = await _salaryService.GetSalary(salaryId);
            if (salary == null || salary.EmployeeId != employeeId)
            {
                return NotFound();
            }

            await _salaryService.DeleteSalary(salaryId);
            return Ok("Salary deleted successfully.");
        }

        // POST: api/Employee/assign-job
        [Authorize(Roles = "CompanyOwner,CompanyManager")]
        [HttpPost("assign-job")]
        public async Task<IActionResult> AssignJob(JobAssignmentDto jobAssignmentDto)
        {
            var employee = await _employeeRepository.GetByIdAsync(jobAssignmentDto.EmployeeId);
            if (employee == null)
            {
                return NotFound("Employee not found.");
            }

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _userRepository.GetByIdAsync(int.Parse(userId));

            if (user == null || user.CompanyId == null || employee.CompanyId != user.CompanyId)
            {
                return BadRequest("User or CompanyId not found or mismatch.");
            }

            employee.JobId = jobAssignmentDto.JobId;
            await _employeeRepository.UpdateAsync(employee);

            return Ok("Job assigned to employee successfully.");
        }

        // POST: api/Employee/assign-department
        [Authorize(Roles = "CompanyOwner,CompanyManager")]
        [HttpPost("assign-department")]
        public async Task<IActionResult> AssignDepartment(DepartmentAssignmentDto departmentAssignmentDto)
        {
            var employee = await _employeeRepository.GetByIdAsync(departmentAssignmentDto.EmployeeId);
            if (employee == null)
            {
                return NotFound("Employee not found.");
            }

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _userRepository.GetByIdAsync(int.Parse(userId));

            if (user == null || user.CompanyId == null || employee.CompanyId != user.CompanyId)
            {
                return BadRequest("User or CompanyId not found or mismatch.");
            }

            employee.DepartmentId = departmentAssignmentDto.DepartmentId;
            await _employeeRepository.UpdateAsync(employee);

            return Ok("Department assigned to employee successfully.");
        }

        // POST: api/Employee/assign-user
        [Authorize(Roles = "CompanyOwner,CompanyManager")]
        [HttpPost("assign-user")]
        public async Task<IActionResult> AssignUser(UserAssignmentDto userAssignmentDto)
        {
            var assignEmployee = await _employeeRepository.GetByIdAsync(userAssignmentDto.EmployeeId);
            if (assignEmployee == null)
            {
                return NotFound("Employee not found.");
            }
            var assignUser = await _userRepository.GetByIdAsync(userAssignmentDto.UserId);
            if (assignUser == null)
            {
                return NotFound("User not found.");
            }

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _userRepository.GetByIdAsync(int.Parse(userId));

            if (user == null || user.CompanyId == null || assignEmployee.CompanyId != assignUser.CompanyId)
            {
                return BadRequest("Not found or mismatch.");
            }

            assignEmployee.UserId = userAssignmentDto.UserId;
            await _employeeRepository.UpdateAsync(assignEmployee);

            return Ok("User assigned to employee successfully.");
        }

        [Authorize(Roles = "CompanyOwner,CompanyManager,CompanyUser")]
        [HttpGet("employee-card")]
        public async Task<ActionResult<EmployeeCardDto>> GetEmployeeCard()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _userRepository.GetByIdAsync(int.Parse(userId));
            var employee = await _context.Employees.Where(e => e.UserId == user.Id).FirstOrDefaultAsync();
            if (employee == null)
            {
                return NotFound("Employee not found.");
            }
            var employeeCard = await _employeeService.GetEmployeeCardAsync(employee.Id);


            return employeeCard;
        }
    }


}

