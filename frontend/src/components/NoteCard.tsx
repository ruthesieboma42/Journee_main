
import type { Note } from "../services/notes.service";

interface NoteCardProps {
  note: Note;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

function NoteCard({ note, isSelected, onSelect }: NoteCardProps) {
  return (
    <div
      onClick={() => onSelect(note.id)} // ⚠️ Pass note.id, not entire note
      style={{
        marginTop: 50,
        marginLeft: 20,
        marginRight: 200,
        padding: 60,
        width: 560,
        backgroundColor: isSelected ? '#E9D5FF' : '#F2C6DF',
        cursor: 'pointer',
        borderRadius: 8,
        marginBottom: 8
      }}
    >
      <h2>{note.title}</h2>
      <p>{note.content.slice(0, 80)}...</p>
    </div>
  )
}
export default NoteCard;