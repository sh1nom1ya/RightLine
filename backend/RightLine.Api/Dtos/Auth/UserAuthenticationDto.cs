using System.ComponentModel.DataAnnotations;

namespace RightLine.Api.Dtos.Auth;

public class UserAuthenticationDto
{
    [Required]
    public string? Email { get; set; }
    [Required]
    public string? Password { get; set; }
}