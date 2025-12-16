import NoteCard from "./NoteCard";
import type { Note } from "../services/notes.service";

interface NoteListProps {
  notes: Note[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onCreateNote?: () => void;
}

export default function NoteList({
  notes,
  selectedId,
  onSelect,
  onCreateNote,
}: NoteListProps) {
  console.log(notes, "====")
  return (
    <div className="note-list">
      {/* {onCreateNote && ( */}
        <button
          onClick={onCreateNote}
          style={{
            width: "100%",
            height: 48,
            backgroundColor: "#7D30E0",
            color: "#FFFFFF",
            fontSize: 14,
            fontWeight: 600,
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            marginBottom: 16,
            fontFamily: "plus-jakarta-sans, sans-serif",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          + New Entry
        </button>
      {/* )} */}
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          isSelected={note.id === selectedId}
          onSelect={() => onSelect(note.id)}
        />
      ))}
    </div>
  );
}
