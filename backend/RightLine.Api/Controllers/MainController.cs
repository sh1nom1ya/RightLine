using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RightLine.Api.Dtos;
using RightLine.Api.Extensions;
using RightLine.DataAccess;
using RightLine.DataAccess.Models;

namespace RightLine.Api.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class MainController(
    AppDbContext db,
    ILogger<MainController> logger,
    UserManager<User> userManager
    ) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetProducts(CancellationToken ct)
    {
        var products = await db.Products
            .ToListAsync();

        if (!products.Any())
        {
            return NotFound("Продукты отсутствуют");
        }
        
        return Ok(products);
    }

    [HttpGet]
    public async Task<IActionResult> GetDetails([FromQuery] int productId, CancellationToken ct)
    {
        var product = await db.Products.FindAsync(productId, ct);

        if (product == null)
        {
            return NotFound($"Продукт {productId} не найден");
        }

        var dto = new ProductDto
        {
            Title = product.Title,
            Description = product.Description,
            Idea = product.Idea,
            ImagePath = product.ImagePath,
        };
        
        return Ok(dto);
    }
    
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> CreateOrder([FromQuery] int productId, CancellationToken ct)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null)
        {
            return Unauthorized();
        }

        var user = await userManager.FindByIdAsync(userId);
        if (user == null)
        {
            return Unauthorized();
        }

        var product = await db.Products.FindAsync(productId , ct);
        if (product == null)
        {
            return NotFound("Продукт не найден");
        }

        var order = new Order
        {
            Code = OrderCodeGenerator.GenerateOrderCode(),
            CreatedAt = DateTime.UtcNow,
            UserId = user.Id,
            ProductId = product.Id
        };

        db.Orders.Add(order);
        await db.SaveChangesAsync(ct);

        return Ok();
    }

}