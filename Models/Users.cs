using Journee.Models;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Journee.Models
{
    [Table("users")]
    public class Users
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        public string? FirstName { get; set; }

        public string? LastName { get; set; }


        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;


        // Navigation property
        public ICollection<Note> Notes { get; set; } = new List<Note>();
        public ICollection<Category> Categories { get; set; } = new List<Category>();
    }
}