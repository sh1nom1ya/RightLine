using Microsoft.AspNetCore.Identity;

namespace RightLine.DataAccess.Models;

public class User : IdentityUser
{
    public string FirstName { get; set; } = String.Empty;
    public string LastName { get; set; } = String.Empty;
}