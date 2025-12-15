using Journee.Models;
using Microsoft.EntityFrameworkCore;

namespace Journee.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Users> Users { get; set; }
        public DbSet<Note> Notes { get; set; }
        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure User
            //modelBuilder.Entity<Users>(entity =>
            //{
            //    entity.HasKey(e => e.id).HasColumnName;
            //    entity.HasIndex(e => e.Email).IsUnique();
            //    entity.Property(e => e.Email).IsRequired().HasMaxLength(255);
            //    entity.Property(e => e.PasswordHash).IsRequired();
            //    entity.Property(e => e.FullName).HasMaxLength(100);
            //});

            modelBuilder.Entity<Users>(entity =>
            {
                entity.ToTable("users");

                entity.HasKey(e => e.Id);

                entity.Property(e => e.Id)
                      .HasColumnName("id");

                entity.HasIndex(e => e.Email)
                      .IsUnique();

                entity.Property(e => e.Email)
                      .HasColumnName("email")
                      .IsRequired()
                      .HasMaxLength(255);

                entity.Property(e => e.PasswordHash)
                      .HasColumnName("hashed_password")
                      .IsRequired();

                entity.Property(e => e.FirstName)
                      .HasColumnName("first_name")
                      .HasMaxLength(100)
                       .IsRequired();

                entity.Property(e => e.LastName)
                      .HasColumnName("last_name")
                      .HasMaxLength(100)
                       .IsRequired();

                entity.Property(e => e.CreatedAt)
                       .HasColumnName("created_at")
                       .HasMaxLength(100);

                entity.Property(e => e.UpdatedAt)
                       .HasColumnName("updated_at")
                       .HasMaxLength(100);

            });

            // Configure Category
            modelBuilder.Entity<Category>(entity =>
            {
                entity.ToTable("category");

                entity.HasKey(c => c.Id);

                entity.Property(c => c.Id)
                      .HasColumnName("id");

                entity.Property(c => c.UserId)
                      .HasColumnName("user_id")
                      .IsRequired();

                entity.Property(c => c.CategoryName)
                      .HasColumnName("category_name")
                      .IsRequired()
                      .HasMaxLength(100);

                entity.Property(c => c.CreatedAt)
                      .HasColumnName("created_at");

                entity.Property(c => c.UpdatedAt)
                      .HasColumnName("updated_at");

                // Relationships
                entity.HasOne(c => c.User)
                      .WithMany(u => u.Categories)
                      .HasForeignKey(c => c.UserId)
                      .OnDelete(DeleteBehavior.Cascade);

                // Unique per user
                entity.HasIndex(c => new { c.UserId, c.CategoryName })
                      .IsUnique();
            });


            // Configure Note
            modelBuilder.Entity<Note>(entity =>
            {
                entity.ToTable("notes");

                entity.HasKey(n => n.Id);

                entity.Property(n => n.Id)
                      .HasColumnName("id");

                entity.Property(n => n.UserId)
                      .HasColumnName("user_id")
                      .IsRequired();

                entity.Property(n => n.CategoryId)
                      .HasColumnName("category_id");
                      //.IsRequired();

                entity.Property(n => n.Title)
                      .HasColumnName("note_title")
                      .IsRequired()
                      .HasMaxLength(200);

                entity.Property(n => n.Content)
                      .HasColumnName("note_content");
                      //.HasColumnType("text");

                entity.Property(n => n.CreatedAt)
                      .HasColumnName("created_at");

                entity.Property(n => n.UpdatedAt)
                      .HasColumnName("updated_at");

                // Relationship with User
                entity.HasOne(n => n.User)
                      .WithMany(u => u.Notes)
                      .HasForeignKey(n => n.UserId)
                      .OnDelete(DeleteBehavior.Cascade);

                //  relationship with Category
                entity.HasOne(n => n.Category)
                      .WithMany(c => c.Notes)
                      .HasForeignKey(n => n.CategoryId)
                      .OnDelete(DeleteBehavior.SetNull);
            });

        
        }
    }
}