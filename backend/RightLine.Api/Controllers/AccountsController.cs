using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RightLine.Api.Dtos;
using RightLine.Api.Dtos.Auth;
using RightLine.Api.Jwt;
using RightLine.DataAccess.Models;

namespace RightLine.Api.Controllers;

[Route("[controller]/[action]")]
[ApiController]
public class AccountsController(
    UserManager<User> userManager,
    IMapper mapper,
    JwtHandler jwtHandler,
    ILogger<AccountsController> logger) : Controller
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
        
        //GetProfile
        
        //GetUserOrders
    }
}