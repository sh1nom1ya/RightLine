using Microsoft.AspNetCore.Mvc;
using RightLine.DataAccess.Models;

namespace RightLine.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MainController : ControllerBase
{
    // private readonly IWebHostEnvironment _env;
    // private readonly ApplicationDbContext _context;
    //
    // public ProductController(IWebHostEnvironment env, ApplicationDbContext context)
    // {
    //     _env = env;
    //     _context = context;
    // }
    //
    // [HttpPost("upload")]
    // public async Task<IActionResult> Upload([FromForm] ProductDto productDto, [FromForm] IFormFile imageFile)
    // {
    //     if (imageFile == null || imageFile.Length == 0)
    //         return BadRequest("Image file is required.");
    //
    //     var uploadDir = Path.Combine(Directory.GetCurrentDirectory(), "uploads", "images");
    //     Directory.CreateDirectory(uploadDir); // Если папки нет — создаем
    //
    //     var uniqueName = Guid.NewGuid() + Path.GetExtension(imageFile.FileName);
    //     var filePath = Path.Combine(uploadDir, uniqueName);
    //
    //     using (var stream = new FileStream(filePath, FileMode.Create))
    //     {
    //         await imageFile.CopyToAsync(stream);
    //     }
    //
    //     var imageUrl = $"/uploads/images/{uniqueName}";
    //
    //     var product = new Product
    //     {
    //         Title = productDto.Title,
    //         Description = productDto.Description,
    //         ShortDescription = productDto.ShortDescription,
    //         ImagePath = imageUrl
    //     };
    //
    //     _context.Products.Add(product);
    //     await _context.SaveChangesAsync();
    //
    //     return Ok(product);
    // }
    
    //GetAllProducts
    
    //GetDetails
    
    //MakingOrder
}