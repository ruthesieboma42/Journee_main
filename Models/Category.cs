using System.ComponentModel.DataAnnotations.Schema;

namespace Journee.Models
{
    [Table("category")]

    public class Category
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string CategoryName { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        //Navigation property
        public Users User { get; set; } = null!;
        public ICollection<Note> Notes { get; set; } = new List<Note>();
    }
}