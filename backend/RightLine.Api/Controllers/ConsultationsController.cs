using System.Security.Claims;
using DefaultNamespace;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RightLine.Api.Dtos;
using RightLine.DataAccess;
using RightLine.DataAccess.Models;

namespace RightLine.Api.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class ConsultationsController(
    UserManager<User> userManager,
    ILogger<ConsultationsController> logger,
    AppDbContext db
    ) : Controller
{
    [HttpGet]
    [Authorize(Policy = "AdminPolicy")]
    public async Task<IActionResult> GetDoneConsultations(CancellationToken ct)
    {
        var consultaions = await db.Consultations
            .Include(c => c.User)
            .Where(c => c.IsDone == true)
            .Select(c => new ConsultationDto
            {
                Id = c.Id,
                Message = c.Message,
                FirstName = c.User.FirstName,
                LastName = c.User.LastName,
                PhoneNumber = c.User.PhoneNumber,
                Email = c.User.Email,
            })
            .ToListAsync(ct);
        if (consultaions.Count == 0)
        {
            return NotFound("Успешно пройденных консультаций нет");
        }

        return Ok(consultaions);
    }

    [HttpGet]
    [Authorize(Policy = "AdminPolicy")]
    public async Task<IActionResult> GetActiveConsultations(CancellationToken ct)
    {
        var consultaions = await db.Consultations
            .Include(c => c.User)
            .Where(c => c.IsDone == false)
            .Select(c => new ConsultationDto
            { 
                Id = c.Id,
                Message = c.Message,
                FirstName = c.User.FirstName,
                LastName = c.User.LastName,
                PhoneNumber = c.User.PhoneNumber,
                Email = c.User.Email,
            })
            .ToListAsync(ct);

        if (consultaions.Count == 0)
        {
            return NotFound("Активных запросов на консультацию не найдено");
        }

        return Ok(consultaions);
    }

    [HttpPut]
    [Authorize(Policy = "AdminPolicy")]
    public async Task<IActionResult> ConfirmConsultation([FromQuery] int consultationId, CancellationToken ct)
    {
        var consultation = await db.Consultations
            .FindAsync(consultationId);
        
        if (consultation == null)
        {
            return NotFound("Консультация не найдена");
        }

        consultation.IsDone = true;

        await db.SaveChangesAsync(ct);

        logger.LogInformation($"Консультация {consultation.Id} для {consultation.UserId} успешно проведена");

        return Ok();
    }

    [HttpDelete]
    [Authorize(Policy = "AdminPolicy")]
    public async Task<IActionResult> CancelConsultation([FromQuery] int consultationId, CancellationToken ct)
    {
        var consultation = await db.Consultations
            .FindAsync(consultationId);
        
        if (consultation == null)
        {
            return NotFound("Консультация не найдена");
        }

        db.Consultations.Remove(consultation);

        await db.SaveChangesAsync(ct);

        logger.LogInformation($"Консультация {consultation.Id} для {consultation.UserId} отклонена");

        return Ok();
    }
    
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> CreateConsultation([FromBody] CreateConsultationDto dto, CancellationToken ct)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null)
        {
            return Unauthorized();
        }

        var consultation = new Consultation
        {
            Message = dto.Message,
            CreatedAt = DateTime.UtcNow,
            UserId = userId,
            IsDone = false
        };

        db.Consultations.Add(consultation);
        await db.SaveChangesAsync(ct);

        return Ok("Ваша заявка отправлена на рассмотрение");
    }
}
    