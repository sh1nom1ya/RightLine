using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RightLine.DataAccess.Models;

namespace RightLine.DataAccess.SeedData;

public class RoleConfiguration : IEntityTypeConfiguration<Role>
{
    public void Configure(EntityTypeBuilder<Role> builder)
    {
        builder.HasData(
            new Role
            {
                Id = "b3a74752-ea5a-417f-954f-9224bf4ad78f",
                Name = "Admin",
                NormalizedName = "ADMIN",
                Description = "Role for admins"
            },  
            new Role
            {
                Id = "423ad3af-66cb-4da3-9d27-0e9684dae9ae",
                Name = "User",
                NormalizedName = "USER",
                Description = "Role for users"
            }    
        );
    }
}