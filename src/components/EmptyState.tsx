import empty_state_image from "../assets/empty_state.jpg";

interface EmptyStateProps {
  onCreateNote?: () => void;
}

function EmptyState({ onCreateNote }: EmptyStateProps) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
      }}
    >
      <img
        src={empty_state_image}
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
        style={{
          width: "100%",
          maxWidth: 320,
          height: 52,
          backgroundColor: "#7D30E0",
          color: "#FFFFFF",
          fontSize: 15,
          fontWeight: 700,
          border: "none",
          borderRadius: 12,
          cursor: "pointer",
          marginTop: 6,
          fontFamily: "plus-jakarta-sans, sans-serif",
        }}
        onClick={onCreateNote}
      >
        New Entry
      </button>
    </div>
  );
}

export default EmptyState;
