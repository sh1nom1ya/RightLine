using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RightLine.DataAccess;
using RightLine.DataAccess.Models;

namespace RightLine.Api.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class ConsultationsController(
    ILogger<ConsultationsController> logger,
    AppDbContext db
    ) : Controller
{
    [HttpGet]
    [Authorize(Policy = "AdminPolicy")]
    public async Task<IActionResult> GetDoneConsultations(CancellationToken ct)
    {
        var consultaions = await db.Consultations
            .Where(c => c.IsDone == true)
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
            .Where(c => c.IsDone == false)
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
}
    