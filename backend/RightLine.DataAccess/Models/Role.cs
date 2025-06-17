using Microsoft.AspNetCore.Identity;

namespace RightLine.DataAccess.Models;

public class Role : IdentityRole
{
    public string? Description { get; set; }
}