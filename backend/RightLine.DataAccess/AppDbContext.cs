using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.General;
using RightLine.DataAccess.Models;
using RightLine.DataAccess.SeedData;

namespace RightLine.DataAccess;

public class AppDbContext(IConfiguration configuration) : IdentityDbContext<User, Role, string>
{
    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        options.UseNpgsql(configuration.GetConnectionString("Database"));
    }
    
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.ApplyConfiguration(new RoleConfiguration());
    }
    
    public DbSet<Product> Products { get; set; }
    public DbSet<Consultation> Consultations { get; set; }
    public DbSet<Order> Orders { get; set; }
}