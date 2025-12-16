# Notes Store

This Zustand store manages the global state for notes in the Journee application.

## Features

- **Global State**: Centralized notes management across components
- **Async Actions**: Built-in API integration with loading states
- **Note Selection**: Track which note is currently selected for editing
- **DevTools**: Redux DevTools integration for debugging
- **Selectors**: Optimized selectors for derived state

## Usage

### Basic Usage

```tsx
import { useNotesStore, useSelectedNote } from '../store/notes.store';

function NotesComponent() {
  const { notes, loading, loadNotes, createNote } = useNotesStore();
  const selectedNote = useSelectedNote();

  // Load notes on component mount
  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {notes.map(note => (
            <li key={note.id}>{note.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

### Actions

```tsx
// Create a new note
const handleCreateNote = async () => {
  try {
    const newNote = await createNote();
    console.log('Created note:', newNote);
  } catch (error) {
    console.error('Failed to create note:', error);
  }
};

// Update a note
const handleUpdateNote = async (note) => {
  try {
    await updateNote(note);
    console.log('Note updated successfully');
  } catch (error) {
    console.error('Failed to update note:', error);
  }
};

// Select a note
const handleSelectNote = (noteId) => {
  selectNote(noteId);
};
```

### Selectors

```tsx
// Get selected note
const selectedNote = useSelectedNote();

// Get notes count
const notesCount = useNotesCount();
```

## Store Structure

```typescript
interface NotesState {
  // State
  notes: Note[];           // Array of all notes
  loading: boolean;        // Loading state for async operations
  selectedNoteId: string | null; // ID of currently selected note
  
  // Actions
  loadNotes: () => Promise<void>;     // Load notes from API
  createNote: () => Promise<Note>;    // Create new note
  updateNote: (note: Note) => Promise<Note>; // Update existing note
  selectNote: (id: string | null) => void;   // Select note for editing
  clearNotes: () => void;             // Clear all notes (logout)
}
```

## Migration from useNotes Hook

The store provides the same functionality as the existing `useNotes` hook but with global state:

**Before (Hook):**
```tsx
const { notes, loading, createNote, updateNote } = useNotes();
```

**After (Store):**
```tsx
const { notes, loading, createNote, updateNote } = useNotesStore();
```

The API is identical, making migration seamless.