import journee_logo from "../assets/journee_logo.svg";
import profileimage from "../assets/background_image_old.jpg";
import { useNavigate } from "react-router-dom";
import { routes } from "../utils/navigation";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic here (clear tokens, etc.)
    navigate(routes.LOGIN);
  };

  return (
    <div style={{ width: "100vw", backgroundColor: "#f9fafb" }}>
      <div
        style={{
          width: "100%",
          background: "rgba(249,250,251,0.98)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08)",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 18,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          borderRadius: 0,
          backdropFilter: "saturate(120%) blur(10px)",
          borderBottom: "1px solid rgba(0,0,0,0.05)",
          padding: "12px 0",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingLeft: 32,
          }}
        >
          <img
            src={journee_logo}
            alt="Journee Logo"
            style={{ width: 100, height: "auto" }}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
          }}
        >
          <img
            src={profileimage}
            alt="Profile Image"
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
              paddingRight: 32,
              paddingTop: 16,
            }}
          >
            <h1
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#0f172a",
                margin: 0,
                fontFamily: "plus-jakarta-sans, sans-serif",
              }}
            >
              {/* This should not be hard coded */}
              Oghenefejiro Esieboma
            </h1>
            <p
              style={{
                fontSize: 12,
                color: "#6b7280",
                marginTop: 4,
                fontFamily: "plus-jakarta-sans, sans-serif",
              }}
            >
              {/* This should not be hard coded */}
              ruthesieboma@gmail.com
            </p>
          </div>

          <button
            onClick={handleLogout}
            style={{
              padding: "8px 16px",
              backgroundColor: "#ef4444",
              color: "white",
              border: "none",
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              marginRight: 32,
              fontFamily: "plus-jakarta-sans, sans-serif",
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
