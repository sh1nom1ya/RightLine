using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RightLine.Api.Dtos;
using RightLine.DataAccess;
using RightLine.DataAccess.Models;

namespace RightLine.Api.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class ProductsController(
    AppDbContext db,
    ILogger<ProductsController> logger
    ) : Controller
{
    [HttpGet]
    [Authorize(Policy = "AdminPolicy")]
    public async Task<IActionResult> GetAllProducts(CancellationToken ct)
    {
        var products = await db.Products
            .ToListAsync();

        if (!products.Any())
        {
            return NotFound("Продукты отсутствуют");
        }
        
        return Ok(products);
    }
    
    [HttpPost]
    [Authorize(Policy = "AdminPolicy")]
    public async Task<IActionResult> CreateProduct(
        [FromForm] ProductDto productDto,
        [FromForm] IFormFile? imageFile,
        CancellationToken ct)
    {
        string? imageUrl = null;

        if (imageFile != null && imageFile.Length > 0)
        {
            var uploadDir = Path.Combine(Directory.GetCurrentDirectory(), "uploads", "images");
            Directory.CreateDirectory(uploadDir); 

            var uniqueName = Guid.NewGuid() + Path.GetExtension(imageFile.FileName);
            var filePath = Path.Combine(uploadDir, uniqueName);

            await using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(stream, ct);
            }

            imageUrl = $"/uploads/images/{uniqueName}";
        }

        var product = new Product
        {
            Title = productDto.Title,
            Description = productDto.Description,
            ShortDescription = productDto.ShortDescription,
            Idea = productDto.Idea,
            ImagePath = imageUrl
        };

        db.Products.Add(product);
        await db.SaveChangesAsync(ct);

        return Ok(product);
    }
    
    [HttpPut]
    [Authorize(Policy = "AdminPolicy")]
    public async Task<IActionResult> UpdateProduct(
        [FromQuery] int productId,
        [FromForm] ProductDto productDto,
        [FromForm] IFormFile? imageFile,
        CancellationToken ct)
    {
        var product = await db.Products.FindAsync(productId, ct);
        if (product == null)
        {
            return NotFound("Продукт не найден");
        }

        product.Title = productDto.Title;
        product.Description = productDto.Description;
        product.ShortDescription = productDto.ShortDescription;
        product.Idea = productDto.Idea;

        if (imageFile != null && imageFile.Length > 0)
        {
            if (!string.IsNullOrEmpty(product.ImagePath))
            {
                var oldImagePath = Path.Combine(Directory.GetCurrentDirectory(),
                    product.ImagePath.TrimStart('/').Replace('/', Path.DirectorySeparatorChar));
                if (System.IO.File.Exists(oldImagePath))
                    System.IO.File.Delete(oldImagePath);
            }

            var uploadDir = Path.Combine(Directory.GetCurrentDirectory(), "uploads", "images");
            Directory.CreateDirectory(uploadDir);

            var uniqueName = Guid.NewGuid() + Path.GetExtension(imageFile.FileName);
            var filePath = Path.Combine(uploadDir, uniqueName);

            await using var stream = new FileStream(filePath, FileMode.Create);
            await imageFile.CopyToAsync(stream, ct);

            product.ImagePath = $"/uploads/images/{uniqueName}";
        }

        await db.SaveChangesAsync(ct);
        
        logger.LogInformation($"Продукт {productId} обновлён");

        return Ok(product);
    }
    
    [HttpDelete]
    [Authorize(Policy = "AdminPolicy")]
    public async Task<IActionResult> DeleteProduct([FromQuery] int productId, CancellationToken ct)
    {
        var product = await db.Products.FindAsync(productId, ct);
        if (product == null)
        {   
            return NotFound("Продукт не найден");
        }

        if (!string.IsNullOrEmpty(product.ImagePath))
        {
            var imagePath = Path.Combine(Directory.GetCurrentDirectory(),
                product.ImagePath.TrimStart('/').Replace('/', Path.DirectorySeparatorChar));
            if (System.IO.File.Exists(imagePath))
            {
                System.IO.File.Delete(imagePath);
            }
        }

        db.Products.Remove(product);
        await db.SaveChangesAsync(ct);
        
        logger.LogInformation($"Продукт {productId} уделён");

        return Ok(productId);
    }
}