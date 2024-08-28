using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using staffmanagament.BUSINESS.Interfaces;
using staffmanagament.CORE.DTOs;

namespace staffmanagament.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NationalHolidayController : ControllerBase
    {
        private readonly INationalHolidayService _nationalHolidayService;

        public NationalHolidayController(INationalHolidayService nationalHolidayService)
        {
            _nationalHolidayService = nationalHolidayService;
        }

        [HttpGet("upcoming")]
        public async Task<ActionResult<UpcomingNationalHolidayDto>> GetUpcoming()
        {
            var result = await _nationalHolidayService.GetUpcomingNationalHolidaysAsync();
            return Ok(result);
        }
    }
}
