using System.ComponentModel.DataAnnotations;

namespace RightLine.DataAccess.Models;

public class Conference
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string Message { get; set; } = String.Empty;
    [Required]
    public DateTime CreateAt { get; set; }
    public bool IsDone { get; set; } = false;
    
    public string UserId { get; set; }
    public User User { get; set; }
}