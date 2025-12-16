import { useCallback, useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import { useNotesStore } from "../store/notes.store";
import searchIcon from "../assets/search/search.svg";
import filterIcon from "../assets/search/filter.svg";
import emptystateimage from "../assets/empty_state.jpg"

export default function Dashboard() {
  const {
    notes,
    loading,
    selectedNoteId,
    draftNote,
    loadNotes,
    startNewNote,
    updateNote,
    selectNote,
    updateDraftNote,
    cancelEdit,
  } = useNotesStore();

  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  // Compute search results based on current search query
  const searchResults = useMemo(() => {
    if (searchQuery.trim() === "") {
      return notes;
    }

    const normalizedQuery = searchQuery.toLowerCase();
    return notes.filter(
      (item) =>
        item.title.toLowerCase().includes(normalizedQuery) ||
        item.content.toLowerCase().includes(normalizedQuery)
    );
  }, [notes, searchQuery]);

  console.log(searchResults, "search results ===");

  const performSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    performSearch(value);
  };

  if (loading) {
    return (
      <div
        style={{
          fontSize: 16,
          color: "#7D30E0",
          fontFamily: "plus-jakarta-sans, sans-serif",
          fontStyle: "italic",
          paddingLeft: 700,
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        backgroundColor: "#F9FAFB",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />

      <div
        style={{
          display: "flex",
          flex: 1,
          overflow: "hidden",
          marginTop: "80px",
        }}
      >
        <div
          style={{
            width: "40vw",
            height: "100%",
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "column",
            padding: "60px 20px",
            boxSizing: "border-box",
            position: "relative",
            boxShadow:
              "4px 0 20px rgba(0, 0, 0, 0.08), 2px 0 8px rgba(0, 0, 0, 0.04)",
            zIndex: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                position: "relative",
                flex: 1,
                boxSizing: "border-box",
              }}
            >
              <img
                src={searchIcon}
                alt="Search"
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "16px",
                  height: "16px",
                  pointerEvents: "none",
                }}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                placeholder="Search for notes"
                style={{
                  fontSize: 16,
                  backgroundColor: "#FEFDFE",
                  color: "black",
                  height: 40,
                  border: "1px solid #A5B1BF",
                  width: "100%",
                  paddingLeft: "40px",
                  paddingRight: "12px",
                  borderRadius: "13px",
                  outline: "none",
                  fontFamily: "plus-jakarta-sans, sans-serif",
                  transition: "border-color 0.2s ease",
                  boxSizing: "border-box",
                }}
                onFocus={(e) =>
                  ((e.target as HTMLInputElement).style.borderColor = "#7D30E0")
                }
                onBlur={(e) =>
                  ((e.target as HTMLInputElement).style.borderColor = "#A5B1BF")
                }
              />
            </div>

            <img
              src={filterIcon}
              alt="Filter"
              style={{
                width: "20px",
                height: "20px",
                cursor: "pointer",
                opacity: 0.7,
                transition: "opacity 0.2s ease",
                flexShrink: 0,
              }}
              onClick={() => console.log("Filter clicked")}
              onMouseEnter={(e) =>
                ((e.target as HTMLImageElement).style.opacity = "1")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLImageElement).style.opacity = "0.7")
              }
            />
          </div>

          <div
            style={{
              marginTop: "20px",
              flex: 1,
              overflow: "auto",
              paddingRight: "10px",
            }}
          >
            {searchResults.map((note) => (
              <div
                key={note.id}
                style={{
                  backgroundColor: "white",
                  borderRadius: "12px",
                  padding: "16px",
                  marginBottom: "12px",
                  border: "1px solid #e5e7eb",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0,0,0,0.15)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
                onClick={() => selectNote(note.id)}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "8px",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      color: "#1f2937",
                      margin: 0,
                      fontFamily: "plus-jakarta-sans, sans-serif",
                    }}
                  >
                    {note.title}
                  </h3>
                  <span
                    style={{
                      backgroundColor: "#e0e7ff",
                      color: "#3730a3",
                      padding: "4px 8px",
                      borderRadius: "12px",
                      fontSize: "12px",
                      fontWeight: "500",
                      fontFamily: "plus-jakarta-sans, sans-serif",
                    }}
                  >
                    Note
                  </span>
                </div>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#6b7280",
                    margin: 0,
                    lineHeight: "1.5",
                    fontFamily: "plus-jakarta-sans, sans-serif",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {note.content}
                </p>
                <div
                  style={{
                    marginTop: "12px",
                    fontSize: "12px",
                    color: "#9ca3af",
                    fontFamily: "plus-jakarta-sans, sans-serif",
                  }}
                >
                  {new Date(note.updatedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              </div>
            ))}

            {searchResults.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  padding: "40px 20px",
                  color: "#6b7280",
                  fontFamily: "plus-jakarta-sans, sans-serif",
                }}
              >
                <p>No notes found matching your search.</p>
              </div>
            )}
          </div>
        </div>

        <div
          style={{
            flex: 1,
            backgroundColor: "#f8fafc",
            display: "flex",
            flexDirection: "column",
            padding: "20px",
          }}
        >
          {!selectedNoteId && !draftNote ? (
            // Default view - Show "Add Diary entry" button
            <div
              style={{
                display: "flex",
                flexDirection : "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <img
        src={emptystateimage}
        alt="Dog sleeping"
        style={{ width: 100, height: "auto" }}
      />
      <p
        style={{
          fontSize: 14,
          color: "#6b7280",
          marginTop: 4,
          fontFamily: "plus-jakarta-sans, sans-serif",
        }}
      >
        Click on the button below to create a new diary entry 😊
      </p>

              <button
                onClick={() => {
                  startNewNote();
                }}
                style={{
                  backgroundColor: "#7D30E0",
                  color: "#FFFFFF",
                  fontSize: 16,
                  fontWeight: 600,
                  border: "none",
                  borderRadius: 12,
                  cursor: "pointer",
                  padding: "16px 32px",
                  fontFamily: "plus-jakarta-sans, sans-serif",
                  boxShadow: "0 4px 12px rgba(125, 48, 224, 0.3)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 20px rgba(125, 48, 224, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(125, 48, 224, 0.3)";
                }}
              >
                Add Diary Entry
              </button>
            </div>
          ) : (
            // Note editor view
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                backgroundColor: "white",
                borderRadius: "16px",
                padding: "24px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
              }}
            >
              {/* Header with user info, category, and close button */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "24px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      backgroundColor: "#e5e7eb",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#6b7280",
                    }}
                  >
                    👤
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#1f2937",
                        fontFamily: "plus-jakarta-sans, sans-serif",
                      }}
                    >
                      Oghenefejiro Esieboma
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        color: "#6b7280",
                        fontFamily: "plus-jakarta-sans, sans-serif",
                      }}
                    >
                      ruthesieboma@gmail.com
                    </div>
                  </div>
                </div>

                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <select
                    style={{
                      backgroundColor: "#e0e7ff",
                      color: "#3730a3",
                      padding: "8px 16px",
                      borderRadius: "20px",
                      border: "none",
                      fontSize: "14px",
                      fontWeight: "500",
                      fontFamily: "plus-jakarta-sans, sans-serif",
                      cursor: "pointer",
                    }}
                  >
                    <option value="work">Work</option>
                    <option value="personal">Personal</option>
                    <option value="ideas">Ideas</option>
                  </select>

                  <button
                    onClick={cancelEdit}
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      fontSize: "20px",
                      color: "#9ca3af",
                      cursor: "pointer",
                      padding: "4px",
                      borderRadius: "6px",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f3f4f6";
                      e.currentTarget.style.color = "#6b7280";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "#9ca3af";
                    }}
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Title input */}
              <input
                type="text"
                placeholder="Enter your note title..."
                value={draftNote?.title || ""}
                onChange={(e) => updateDraftNote("title", e.target.value)}
                style={{
                  fontSize: "32px",
                  fontWeight: "700",
                  color: "#1f2937",
                  border: "none",
                  outline: "none",
                  marginBottom: "16px",
                  fontFamily: "plus-jakarta-sans, sans-serif",
                  backgroundColor: "transparent",
                }}
              />

              {/* Content textarea */}
              <textarea
                placeholder="Start writing your thoughts, ideas, or notes here..."
                value={draftNote?.content || ""}
                onChange={(e) => updateDraftNote("content", e.target.value)}
                style={{
                  flex: 1,
                  fontSize: "16px",
                  color: "#4b5563",
                  border: "none",
                  outline: "none",
                  resize: "none",
                  fontFamily: "plus-jakarta-sans, sans-serif",
                  backgroundColor: "transparent",
                  lineHeight: "1.6",
                  marginBottom: "24px",
                }}
              />

              {/* Bottom toolbar */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {/* Formatting toolbar */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    backgroundColor: "#1f2937",
                    padding: "8px 16px",
                    borderRadius: "12px",
                  }}
                >
                  <button
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      color: "white",
                      fontSize: "16px",
                      fontWeight: "700",
                      cursor: "pointer",
                      padding: "4px 8px",
                      borderRadius: "4px",
                    }}
                  >
                    B
                  </button>
                  <button
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      color: "white",
                      fontSize: "16px",
                      fontStyle: "italic",
                      cursor: "pointer",
                      padding: "4px 8px",
                      borderRadius: "4px",
                    }}
                  >
                    I
                  </button>
                  <button
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      color: "white",
                      fontSize: "16px",
                      textDecoration: "underline",
                      cursor: "pointer",
                      padding: "4px 8px",
                      borderRadius: "4px",
                    }}
                  >
                    U
                  </button>
                  <div
                    style={{
                      width: "1px",
                      height: "20px",
                      backgroundColor: "#4b5563",
                      margin: "0 4px",
                    }}
                  />
                  <button
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      color: "white",
                      fontSize: "16px",
                      cursor: "pointer",
                      padding: "4px 8px",
                      borderRadius: "4px",
                    }}
                  >
                    ≡
                  </button>
                  <button
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      color: "white",
                      fontSize: "16px",
                      cursor: "pointer",
                      padding: "4px 8px",
                      borderRadius: "4px",
                    }}
                  >
                    ☰
                  </button>
                </div>

                {/* Cancel and Save buttons */}
                <div style={{ display: "flex", gap: "12px" }}>
                  <button
                    onClick={cancelEdit}
                    style={{
                      backgroundColor: "transparent",
                      color: "#6b7280",
                      border: "2px solid #e5e7eb",
                      borderRadius: "12px",
                      padding: "12px 24px",
                      fontSize: "16px",
                      fontWeight: "600",
                      cursor: "pointer",
                      fontFamily: "plus-jakarta-sans, sans-serif",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#d1d5db";
                      e.currentTarget.style.color = "#374151";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#e5e7eb";
                      e.currentTarget.style.color = "#6b7280";
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    onClick={async () => {
                      if (!draftNote) return;
                      try {
                        await updateNote(draftNote);
                        cancelEdit();
                      } catch (error) {
                        console.error("Failed to save note:", error);
                      }
                    }}
                    style={{
                      backgroundColor: "#7c3aed",
                      color: "white",
                      border: "none",
                      borderRadius: "12px",
                      padding: "12px 24px",
                      fontSize: "16px",
                      fontWeight: "600",
                      cursor: "pointer",
                      fontFamily: "plus-jakarta-sans, sans-serif",
                      boxShadow: "0 4px 12px rgba(124, 58, 237, 0.3)",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-1px)";
                      e.currentTarget.style.boxShadow =
                        "0 6px 16px rgba(124, 58, 237, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 12px rgba(124, 58, 237, 0.3)";
                    }}
                  >
                    {draftNote?.id ? "Update Entry" : "Save Entry"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
