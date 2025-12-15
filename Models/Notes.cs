using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Journee.Models
{
    [Table("notes")]

    public class Note
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public Guid UserId { get; set; }

        [Required]
        public Guid CategoryId { get; set; }


        [Required]
        public string Title { get; set; } = "Untitled Note";

        public string Content { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;


        // Navigation property
        public Users User { get; set; } = null!;
        public Category Category { get; set; } = null!;
    }
}