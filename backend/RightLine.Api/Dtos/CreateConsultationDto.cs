using System.ComponentModel.DataAnnotations;

namespace DefaultNamespace;

public class CreateConsultationDto
{
    [Required]
    public string Message { get; set; }
}
