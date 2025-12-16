import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Note } from "../services/notes.service";
import { activeNotesService as notesService } from "../services/notesServiceFactory";

// Just spun up a simple zustand stuff
interface NotesState {
  // State
  notes: Note[];
  loading: boolean;
  selectedNoteId: string | null;
  draftNote: Note | null;

  // Actions
  loadNotes: () => Promise<void>;
  createNote: () => Promise<Note>;
  startNewNote: () => void;
  updateNote: (note: Note) => Promise<Note>;
  deleteNote: (id: string) => Promise<void>;
  selectNote: (id: string | null) => void;
  setDraftNote: (note: Note | null) => void;
  updateDraftNote: (field: keyof Note, value: string) => void;
  cancelEdit: () => void;
  clearNotes: () => void;
}

export const useNotesStore = create<NotesState>()(
  // devtools is mostly for development debugging, just for note.
  devtools(
    (set) => ({
      // Initial state
      notes: [],
      loading: false,
      selectedNoteId: null,
      draftNote: null,

      // Load all notes from API
      loadNotes: async () => {
        set({ loading: true });
        try {
          const notes = await notesService.getNotes();
          set({ notes, loading: false });
        } catch (error) {
          console.error("Failed to load notes:", error);
          set({ loading: false });
        }
      },

      // Create a new note (saves to API)
      createNote: async () => {
        try {
          const newNote = await notesService.createNote();
          set((state) => ({
            notes: [newNote, ...state.notes],
            selectedNoteId: newNote.id,
            draftNote: { ...newNote },
          }));
          return newNote;
        } catch (error) {
          console.error("Failed to create note:", error);
          throw error;
        }
      },

      // Start a new note draft (doesn't save to API until user saves)
      startNewNote: () => {
        const newDraft: Note = {
          id: "", // Empty ID indicates this is a new note
          title: "",
          content: "",
          updatedAt: new Date().toISOString(),
        };
        set({
          selectedNoteId: null, // No selected note since this is new
          draftNote: newDraft,
        });
      },

      // Update an existing note or create a new one
      updateNote: async (note: Note) => {
        try {
          if (note.id === "") {
            // This is a new note, create it
            const newNote = await notesService.createNote();
            // Update the new note with the draft content
            const updatedNote = await notesService.updateNote({
              ...newNote,
              title: note.title,
              content: note.content,
            });
            set((state) => ({
              notes: [updatedNote, ...state.notes],
            }));
            return updatedNote;
          } else {
            // This is an existing note, update it
            const updatedNote = await notesService.updateNote(note);
            set((state) => ({
              notes: state.notes.map((n) =>
                n.id === updatedNote.id ? updatedNote : n
              ),
            }));
            return updatedNote;
          }
        } catch (error) {
          console.error("Failed to save note:", error);
          throw error;
        }
      },

      // Delete a note
      deleteNote: async (id: string) => {
        try {
          await notesService.deleteNote(id);
          set((state) => ({
            notes: state.notes.filter((n) => n.id !== id),
            selectedNoteId:
              state.selectedNoteId === id ? null : state.selectedNoteId,
            draftNote: state.selectedNoteId === id ? null : state.draftNote,
          }));
        } catch (error) {
          console.error("Failed to delete note:", error);
          throw error;
        }
      },

      // Select a note for editing
      selectNote: (id: string | null) => {
        set((state) => {
          const note = id ? state.notes.find((n) => n.id === id) : null;
          return {
            selectedNoteId: id,
            draftNote: note ? { ...note } : null,
          };
        });
      },

      // Set draft note for editing
      setDraftNote: (note: Note | null) => {
        set({ draftNote: note ? { ...note } : null });
      },

      // Update draft note field
      updateDraftNote: (field: keyof Note, value: string) => {
        set((state) => {
          if (!state.draftNote) return state;
          return {
            draftNote: { ...state.draftNote, [field]: value },
          };
        });
      },

      // Cancel editing and return to default view
      cancelEdit: () => {
        set({ selectedNoteId: null, draftNote: null });
      },

      // Clear all notes (useful for logout)
      clearNotes: () => {
        set({ notes: [], selectedNoteId: null, draftNote: null });
      },
    }),
    {
      name: "notes-store",
    }
  )
);

// Selectors for derived state
export const useSelectedNote = () => {
  return useNotesStore((state) => {
    if (!state.selectedNoteId) return null;
    return state.notes.find((note) => note.id === state.selectedNoteId) || null;
  });
};

export const useDraftNote = () => {
  return useNotesStore((state) => state.draftNote);
};

export const useNotesCount = () => {
  return useNotesStore((state) => state.notes.length);
};
