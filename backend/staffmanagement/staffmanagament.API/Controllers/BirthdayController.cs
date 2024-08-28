using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using staffmanagament.BUSINESS.Interfaces;
using staffmanagament.CORE.DTOs;
using staffmanagament.DAL;
using System.Security.Claims;

namespace staffmanagament.API.Controllers
{
    [Authorize(Roles = ("CompanyOwner,CompanyManager,CompanyUser"))]
    [Route("api/[controller]")]
    [ApiController]
    public class BirthdayController : ControllerBase
    {
        private readonly ICompanyService _companyService;
        private readonly AppDbContext _context;
        public BirthdayController(ICompanyService companyService, AppDbContext context)
        {
            _companyService = companyService;
            _context = context;
        }

        [HttpGet("GetUpcomingBirthdays")]
        public async Task<ActionResult<UpcomingBirthdaysDto>> GetUpcomingBirthdays()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _context.Users.Include(u => u.Employee).FirstOrDefaultAsync(u => u.Id == int.Parse(userId));

            if (user == null || user.CompanyId == null)
            {
                return BadRequest("User or CompanyId not found.");
            }
            var upcomingBirthdayList = await _companyService.GetUpcomingBirthdaysAsync(user.CompanyId);
            return Ok(upcomingBirthdayList);
        }
    }
}
