import type { Note } from "./notes.service";

// Sample notes data for development
export const mockNotes: Note[] = [
  {
    id: "1",
    title: "My First Journal Entry",
    content:
      "Today was an amazing day! I started working on my new journal app and made great progress. The weather was perfect for a morning walk, and I felt really inspired to write.",
    updatedAt: "2024-12-15T10:30:00Z",
  },
  {
    id: "2",
    title: "Weekend Plans",
    content:
      "Planning to visit the local farmers market this weekend. Need to pick up some fresh vegetables and maybe try that new coffee stand everyone is talking about.",
    updatedAt: "2024-12-14T15:45:00Z",
  },
  {
    id: "3",
    title: "Book Notes: The Power of Now",
    content:
      "Key insights from Eckhart Tolle's book:\n- Living in the present moment is essential\n- The ego creates unnecessary suffering\n- Mindfulness practice can transform your life\n- Acceptance is the key to inner peace",
    updatedAt: "2024-12-13T09:15:00Z",
  },
  {
    id: "4",
    title: "Recipe Ideas",
    content:
      "Trying new recipes this week:\n1. Mediterranean quinoa salad\n2. Homemade pizza with fresh basil\n3. Chocolate chip cookies (grandma's recipe)\n4. Green smoothie with spinach and mango",
    updatedAt: "2024-12-12T18:20:00Z",
  },
  {
    id: "5",
    title: "Work Reflections",
    content:
      "Had a productive meeting with the team today. We discussed the new project timeline and everyone seems excited about the challenges ahead. Need to follow up on the design mockups.",
    updatedAt: "2024-12-11T14:30:00Z",
  },
  {
    id: "6",
    title: "Travel Dreams",
    content:
      "Places I want to visit:\n- Japan during cherry blossom season\n- Iceland to see the Northern Lights\n- New Zealand for hiking adventures\n- Italy for the food and culture\n- Norway for the fjords",
    updatedAt: "2024-12-10T20:45:00Z",
  },
  {
    id: "7",
    title: "Morning Routine",
    content:
      "Trying to establish a better morning routine:\n- Wake up at 6:30 AM\n- 10 minutes of meditation\n- Light exercise or stretching\n- Healthy breakfast\n- Review daily goals",
    updatedAt: "2024-12-09T07:00:00Z",
  },
  {
    id: "8",
    title: "Gratitude List",
    content:
      "Things I'm grateful for today:\n- Good health\n- Supportive family and friends\n- Meaningful work\n- Beautiful sunset this evening\n- A warm cup of tea\n- Progress on personal projects",
    updatedAt: "2024-12-08T21:15:00Z",
  },
];

// Helper function to generate a new note ID
export const generateNoteId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

// Helper function to create a new note template
export const createNewNote = (): Note => {
  return {
    id: generateNoteId(),
    title: "Untitled Note",
    content: "",
    updatedAt: new Date().toISOString(),
  };
};
