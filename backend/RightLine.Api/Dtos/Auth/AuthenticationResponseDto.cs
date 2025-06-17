namespace RightLine.Api.Dtos.Auth;

public class AuthenticationResponseDto
{
    public bool? IsAuthenticated { get; set; }
    public string? ErrorMessage { get; set; }
    public string? Token { get; set; }
}