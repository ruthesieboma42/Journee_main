using System.ComponentModel.DataAnnotations;

namespace Journee.DTOs
{
    public class NoteResponse
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public DateTime UpdatedAt { get; set; }
    }

    public class CreateNoteRequest
    {
        [Required]
        public string Title { get; set; } = "Untitled Note";
        [Required]
        public string Content { get; set; } = string.Empty;

        public string? Category { get; set; } = string.Empty;
    }

    public class UpdateNoteRequest
    {
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
    }
}