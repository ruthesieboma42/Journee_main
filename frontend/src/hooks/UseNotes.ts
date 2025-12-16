import { useEffect, useState } from "react";
import type { Note } from "../services/notes.service";
import { notesService } from "../services/notes.service";

export default function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      setLoading(true);
      const data = await notesService.getNotes();
      setNotes(data);
    } finally {
      setLoading(false);
    }
  };

  const createNote = async () => {
    const newNote = await notesService.createNote();
    setNotes((prev) => [newNote, ...prev]);
    return newNote;
  };

  const updateNote = async (note: Note) => {
    const updated = await notesService.updateNote(note);
    setNotes((prev) => prev.map((n) => (n.id === updated.id ? updated : n)));
    return updated;
  };

  return {
    notes,
    loading,
    createNote,
    updateNote,
  };
}
