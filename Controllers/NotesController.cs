using Journee.Data;
using Journee.DTOs;
using Journee.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Journee.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class NotesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public NotesController(ApplicationDbContext context)
        {
            _context = context;
        }

        private Guid GetUserId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return Guid.Parse(userIdClaim ?? throw new UnauthorizedAccessException());
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<NoteResponse>>> GetNotes()
        {
            var userId = GetUserId();

            var notes = await _context.Notes
                .Where(n => n.UserId == userId)
                .OrderByDescending(n => n.UpdatedAt)
                .Select(n => new NoteResponse
                {
                    Id = n.Id,
                    Title = n.Title,
                    Content = n.Content,
                    UpdatedAt = n.UpdatedAt
                })
                .ToListAsync();

            return Ok(notes);
        }

        [HttpPost]
        public async Task<ActionResult<NoteResponse>> CreateNote(CreateNoteRequest request)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);
            var userId = GetUserId();
            var user = await _context.Users.FindAsync(userId);
            var category = await _context.Categories.FirstOrDefaultAsync(x => x.CategoryName == request.Category 
            && x.UserId == userId );
            var note = new Note
            {

                UserId = userId,
                Title = request.Title,
                Content = request.Content,
            };
            if( category != null)
            {
                note.CategoryId = category.Id;
            }
            else
            {
                note.Category = new Category
                {
                    UserId = userId,
                    CategoryName = request.Category,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };
            }

                _context.Notes.Add(note);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetNotes), new { id = note.Id }, new NoteResponse
            {
                Id = note.Id,
                Title = note.Title,
                Content = note.Content,
                UpdatedAt = note.UpdatedAt
            });
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<NoteResponse>> UpdateNote(Guid id, UpdateNoteRequest request)
        {
            var userId = GetUserId();

            var note = await _context.Notes
                .FirstOrDefaultAsync(n => n.Id == id && n.UserId == userId);

            if (note == null)
            {
                return NotFound();
            }

            note.Title = request.Title;
            note.Content = request.Content;
            note.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return Ok(new NoteResponse
            {
                Id = note.Id,
                Title = note.Title,
                Content = note.Content,
                UpdatedAt = note.UpdatedAt
            });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNote(Guid id)
        {
            var userId = GetUserId();

            var note = await _context.Notes
                .FirstOrDefaultAsync(n => n.Id == id && n.UserId == userId);

            if (note == null)
            {
                return NotFound();
            }

            _context.Notes.Remove(note);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}