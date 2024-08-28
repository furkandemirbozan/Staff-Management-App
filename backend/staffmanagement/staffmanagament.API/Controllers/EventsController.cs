﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using staffmanagament.BUSINESS.Interfaces;
using staffmanagament.CORE.DTOs;
using System.Security.Claims;

namespace staffmanagament.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EventsController : ControllerBase
    {
        private readonly IEventService _eventService;

        public EventsController(IEventService eventService)
        {
            _eventService = eventService;
        }

        [HttpGet("upcoming")]
        public async Task<IActionResult> GetUpcomingEvents()
        {
            var companyId = int.Parse(User.FindFirst("CompanyId")?.Value);
            System.Console.WriteLine(companyId);
            var events = await _eventService.GetUpcomingEventsAsync(companyId);
            return Ok(events);
        }

        [HttpPost]
        public async Task<IActionResult> AddEvent([FromBody] CreateEventDto createEventDTO)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var companyId = int.Parse(User.FindFirst("CompanyId")?.Value);
            var eventDto = new EventDto
            {
                Name = createEventDTO.Name,
                Description = createEventDTO.Description,
                StartDate = createEventDTO.StartDate,
                EndDate = createEventDTO.EndDate,
                CompanyId = companyId,
                UserId = userId
            };
            await _eventService.AddEventAsync(eventDto);
            return Ok("Etkinlik Başarıyla Olusturuldu");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEvent(int id, [FromBody] EventDto eventDto)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var companyId = int.Parse(User.FindFirst("CompanyId")?.Value);
            if (eventDto.CompanyId == companyId && eventDto.UserId == userId)
            {
                await _eventService.UpdateEventAsync(id, eventDto);
                return Ok();
            }
            return Unauthorized();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvent(int id)
        {
            await _eventService.DeleteEventAsync(id);
            return Ok();
        }
    }
}
