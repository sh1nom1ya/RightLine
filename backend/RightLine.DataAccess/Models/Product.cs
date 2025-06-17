using System.ComponentModel.DataAnnotations;

namespace RightLine.DataAccess.Models;

public class Product
{
    [Key]
    public int Id { get; set; }
    [Required]
    public string Title { get; set; } = String.Empty;
    [Required]
    public string Description { get; set; } = String.Empty;
    [Required]
    public string ShortDescription { get; set; } = String.Empty;
    [Required]
    public string Idea { get; set; } = String.Empty;
    public string? ImagePath { get; set; }
}