using api.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace api.Data;


public class AppDbContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<User> Users => Set<User>();
    public DbSet<Music> Musics => Set<Music>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Music>()
            .HasOne(m => m.Uploader)
            .WithMany()
            .HasForeignKey(m => m.UploaderId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
