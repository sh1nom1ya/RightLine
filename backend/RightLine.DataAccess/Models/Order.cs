namespace RightLine.DataAccess.Models;

public class Order
{
    public int Id { get; set; }
    public string Code { get; set; } = String.Empty;
    public DateTime CreatedAt { get; set; }
    
    public string UserId { get; set; }
    public User User { get; set; }

    public int ProductId { get; set; }
    public Product Product { get; set; }
}