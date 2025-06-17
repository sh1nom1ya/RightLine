namespace RightLine.Api.Dtos.Auth;

public class RegistrationResponseDto
{
    public bool IsSuccessfullRegistration { get; set; }
    public IEnumerable<string>? Errors { get; set; }
}