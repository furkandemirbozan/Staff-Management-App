using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using staffmanagament.BUSINESS.Interfaces;
using staffmanagament.CORE.DTOs;
using System.Security.Claims;

namespace staffmanagament.API.Controllers
{
    [Authorize(Roles = "Admin,CompanyManager")]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        // GET: api/User
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GetUserDto>>> GetUsersByCompany()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _userService.GetUserById(int.Parse(userId));

            if (user == null || user.CompanyId == null)
            {
                return BadRequest("User or CompanyId not found.");
            }

            var users = await _userService.GetUsersByCompanyId(user.CompanyId.Value);
            var getUserDTOs = users.Select(u => new GetUserDto
            {
                Id = u.Id,
                UserName = u.UserName,
                Email = u.Email,
                CompanyId = u.CompanyId
            }).ToList();

            return Ok(getUserDTOs);
        }
    }
}
