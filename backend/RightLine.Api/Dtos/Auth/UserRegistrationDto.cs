using System.ComponentModel.DataAnnotations;

namespace RightLine.Api.Dtos.Auth;

public class UserRegistrationDto
{
    [Required]
    public string? FirstName { get; set; }
    [Required]
    public string? LastName { get; set; }
    [Required]
    public string? PhoneNumber { get; set; }
    [Required]
    public string? Email { get; set; }
    [Required]
    public string? Password { get; set; }

    [Required]
    public bool ConfirmPassword { get; set; } = true;
}