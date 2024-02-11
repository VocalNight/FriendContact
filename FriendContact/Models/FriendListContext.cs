using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;

namespace FriendContact.Models
{
    public class FriendListContext : DbContext
    {
        public FriendListContext( DbContextOptions<FriendListContext> options ) : base(options) { }

        protected override void OnModelCreating( ModelBuilder modelBuilder )
        {
            modelBuilder.Entity<Friend>()
                .HasOne(e => e.FriendCategory)
                .WithMany(e => e.Friends)
                .HasForeignKey(e => e.CategoryId)
                .IsRequired();
        }

        public DbSet<Friend> Friends { get; set; }
        public DbSet<Category> Categories { get; set; }
    }
}
