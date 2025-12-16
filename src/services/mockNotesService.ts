import type { Note } from "./notes.service";
import { mockNotes, createNewNote } from "./mockData";

// Mock implementation of the notes service for development
class MockNotesService {
  private notes: Note[] = [...mockNotes];
  private delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  async getNotes(): Promise<Note[]> {
    // Simulate API delay
    await this.delay(500);

    // Sort by updatedAt descending (newest first)
    return [...this.notes].sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }

  async createNote(): Promise<Note> {
    // Simulate API delay
    await this.delay(300);

    const newNote = createNewNote();
    this.notes.unshift(newNote); // Add to beginning of array

    console.log("Created new note:", newNote);
    return newNote;
  }

  async updateNote(note: Note): Promise<Note> {
    // Simulate API delay
    await this.delay(200);

    const updatedNote = {
      ...note,
      updatedAt: new Date().toISOString(),
    };

    const index = this.notes.findIndex((n) => n.id === note.id);
    if (index !== -1) {
      this.notes[index] = updatedNote;
    }

    console.log("Updated note:", updatedNote);
    return updatedNote;
  }

  async deleteNote(id: string): Promise<void> {
    // Simulate API delay
    await this.delay(200);

    this.notes = this.notes.filter((n) => n.id !== id);
    console.log("Deleted note with id:", id);
  }
}

export const mockNotesService = new MockNotesService();
