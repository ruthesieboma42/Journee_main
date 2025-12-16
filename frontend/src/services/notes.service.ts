export interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
}

const API_URL = "http://localhost:5202/api/Notes";

const getAuthHeader = (): Record<string, string> | undefined => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : undefined;
};

export const notesService = {
  async getNotes(): Promise<Note[]> {
    const res = await fetch(API_URL, {
      headers: getAuthHeader(),
    });
    if (!res.ok) throw new Error("Failed to fetch notes");
    return res.json();
  },

  async createNote(): Promise<Note> {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      body: JSON.stringify({
        title: "Untitled Note",
        content: "fgh",
      }),
    });

    if (!res.ok) throw new Error("Failed to create note");
    return res.json();
  },

  async updateNote(note: Note): Promise<Note> {
    const res = await fetch(`${API_URL}/${note.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      body: JSON.stringify({
        title: note.title,
        content: note.content,
      }),
    });

    if (!res.ok) throw new Error("Failed to update note");
    return res.json();
  },

  async deleteNote(id: string): Promise<void> {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: getAuthHeader(),
    });

    if (!res.ok) throw new Error("Failed to delete note");
  },
};
