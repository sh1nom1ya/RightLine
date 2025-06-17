using System.ComponentModel.DataAnnotations;

namespace RightLine.Api.Dtos;

public class ProductDto
{
    [Required]
    public string Title { get; set; } = string.Empty;

    [Required]
    public string Description { get; set; } = string.Empty;

    [Required]
    public string ShortDescription { get; set; } = string.Empty;

    [Required]
    public string Idea { get; set; } = string.Empty;
    public string? ImagePath { get; set; }
}
