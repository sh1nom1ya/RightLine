namespace RightLine.Api.Dtos.Auth;

public class ProfileOrderForAdminDto
{
    public string Code { get; set; }
    public string Title { get; set; }
    public DateTime CreatedAt { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
}