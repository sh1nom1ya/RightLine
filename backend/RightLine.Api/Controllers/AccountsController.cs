using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RightLine.Api.Dtos;
using RightLine.Api.Dtos.Auth;
using RightLine.Api.Jwt;
using RightLine.DataAccess;
using RightLine.DataAccess.Models;

namespace RightLine.Api.Controllers;

[Route("[controller]/[action]")]
[ApiController]
public class AccountsController(
    UserManager<User> userManager,
    IMapper mapper,
    JwtHandler jwtHandler,
    ILogger<AccountsController> logger,
    AppDbContext db
    ) : Controller
{
    [HttpPost]
    public async Task<IActionResult> Registrate([FromBody] UserRegistrationDto? userRegistrationDto)
    {
        if (userRegistrationDto is null)
        {
            return BadRequest();
        }

        var user = mapper.Map<User>(userRegistrationDto);
        var result = await userManager.CreateAsync(user, userRegistrationDto.Password);

        if (!result.Succeeded)
        {
            var errors = result.Errors.Select(e => e.Description);

            logger.LogWarning($"Пользователь {userRegistrationDto.Email} не зарегестрирован");

            return BadRequest(new RegistrationResponseDto { Errors = errors });
        }

        await userManager.AddToRoleAsync(user, "User");

        logger.LogInformation($"Пользователь {userRegistrationDto.Email} успешно зарегестрирован");

        return StatusCode(201);
    }

    [HttpPost]
    public async Task<IActionResult> Authenticate([FromBody] UserAuthenticationDto? userAuthenticationDto)
    {
        var user = await userManager.FindByEmailAsync(userAuthenticationDto.Email);

        if (user is null || !await userManager.CheckPasswordAsync(user, userAuthenticationDto.Password))
        {
            return Unauthorized(new AuthenticationResponseDto
            {
                ErrorMessage = "Неверная аутентификация"
            });
        }

        var roles = await userManager.GetRolesAsync(user);
        var token = jwtHandler.CreateToken(user, roles);

        logger.LogInformation($"Пользователь {userAuthenticationDto.Email} успешно авторизован");

        return Ok(new AuthenticationResponseDto
        {
            IsAuthenticated = true,
            Token = token
        });
    }
    
    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetProfile()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized();
        }

        var user = await userManager.FindByIdAsync(userId);

        if (user == null)
        {
            return NotFound("Пользователь не найден");
        }

        var profileDto = mapper.Map<ProfileDto>(user);

        return Ok(profileDto);
    }
    
    [HttpPut]
    [Authorize]
    public async Task<IActionResult> UpdateProfile([FromBody] ProfileDto? profileDto)
    {
        if (profileDto is null)
        {
            return BadRequest("Некорректные данные");
        }

        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var user = await userManager.FindByIdAsync(userId);

        if (user is null)
        {
            return NotFound("Пользователь не найден");
        }

        user.FirstName = profileDto.FirstName ?? user.FirstName;
        user.LastName = profileDto.LastName ?? user.LastName;
        user.Email = profileDto.Email ?? user.Email;
        user.PhoneNumber = profileDto.PhoneNumber ?? user.PhoneNumber;
        
        user.UserName = user.Email; 

        var result = await userManager.UpdateAsync(user);

        if (!result.Succeeded)
        {
            var errors = result.Errors.Select(e => e.Description);
            return BadRequest(new { Errors = errors });
        }

        logger.LogInformation($"Профиль пользователя {user.Email} обновлён");

        return Ok();
    }
    
    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetUserOrders()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized();
        }
        
        var orders = await db.Orders
            .Where(o => o.UserId == userId)
            .Include(o => o.Product)              
            .Select(o => new ProfileOrderDto
            {
                Code = o.Code,
                Title = o.Product.Title,
                CreatedAt = o.CreatedAt
            })
            .ToListAsync();

        return Ok(orders);
    }
    
    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetAllOrders()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var user = await userManager.FindByIdAsync(userId);

        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized();
        }
        
        var orders = await db.Orders
            .Where(o => o.UserId == userId)
            .Include(o => o.Product)              
            .Select(o => new ProfileOrderForAdminDto()
            {
                Code = o.Code,
                Title = o.Product.Title,
                CreatedAt = o.CreatedAt,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber
            })
            .ToListAsync();

        return Ok(orders);
    }
}