
import type { Note } from '../services/notes.service';

interface NoteEditorProps {
  note: Note;
  onChange: (field: keyof Note, value: string) => void;
  onSave: () => void;
}

function NoteEditor({ note, onChange, onSave }: NoteEditorProps) {
  console.log(note, "===");
  
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 12, paddingTop: 80, paddingRight: 80 }}>
      <input
        placeholder="Title"
        value={note.title}
        onChange={(e) => onChange('title', e.target.value)}
        style={{
          width: '100%',
          maxWidth: 660,
          height: 44,
          padding: '10px 12px',
          fontSize: 32,
          fontWeight: 600,
          color: '#CCCCCC',
          borderRadius: 12,
        }}
      />
         <textarea
        placeholder="type your note here..."
        value={""}
        onChange={(e) => onChange('content', e.target.value)}
        style={{
          width: '100%',
          maxWidth: 660,
          height: 44,
          padding: '10px 12px',
          fontSize: 32,
          fontWeight: 600,
          color: '#CCCCCC',
          borderRadius: 12,
        }}
      />
      <button
        onClick={onSave}
        style={{
          marginTop: 16,
          padding: '10px 24px',
          fontSize: 18,
          fontWeight: 500,
          borderRadius: 8,
          background: '#7D30E0',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Save
      </button>
    </div>
  );
}
export default NoteEditor;