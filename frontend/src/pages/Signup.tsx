import backgroundImage from "../assets/background_image.jpg";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../utils/navigation";
import { authService } from "../services/auth.service";
import { useState } from "react";

function Signup() {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await authService.register(firstname, lastname, email, password);
      navigate(routes.DASHBOARD);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to signup");
      }
    }
  };

  return (
    <div
      style={{
        padding: 0,
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        width: "100vw",
        position: "relative",
      }}
    >
      {/* <img
              src={journee_logo}
              alt="Journee Logo"
              style={{ position: 'absolute', left: 60, top: 40, width: 150, height: 'auto' }}
            /> */}

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
        }}
      >
        <div
          style={{
            width: "min(720px, 92%)",
            maxWidth: 720,
            padding: 32,
            borderRadius: 20,
            background: "rgba(255,255,255,0.96)",
            boxShadow: "0 20px 40px rgba(16,24,40,0.12)",
            display: "flex",
            flexDirection: "column",
            gap: 18,
            alignItems: "center",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h1
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: "#0f172a",
                margin: 0,
                fontFamily: "plus-jakarta-sans, sans-serif",
              }}
            >
              Welcome to Journee
            </h1>
            <p
              style={{
                fontSize: 14,
                color: "#6b7280",
                marginTop: 8,
                fontFamily: "plus-jakarta-sans, sans-serif",
              }}
            >
              Put in your details to create an account
            </p>
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 12,
              alignItems: "center",
            }}
          >
            <input
              type="text"
              placeholder="First Name"
              onChange={(e) => setFirstname(e.target.value)}
              style={{
                width: "100%",
                maxWidth: 560,
                height: 44,
                padding: "10px 12px",
                fontSize: 15,
                borderRadius: 12,
                border: "1px solid #E5E7EB",
                fontFamily: "plus-jakarta-sans, sans-serif",
              }}
            />

            <input
              type="text"
              placeholder="Last Name"
              onChange={(e) => setLastname(e.target.value)}
              style={{
                width: "100%",
                maxWidth: 560,
                height: 44,
                padding: "10px 12px",
                fontSize: 15,
                borderRadius: 12,
                border: "1px solid #E5E7EB",
                fontFamily: "plus-jakarta-sans, sans-serif",
              }}
            />

            <input
              type="email"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                maxWidth: 560,
                height: 44,
                padding: "10px 12px",
                fontSize: 15,
                borderRadius: 12,
                border: "1px solid #E5E7EB",
                fontFamily: "plus-jakarta-sans, sans-serif",
              }}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                maxWidth: 560,
                height: 44,
                padding: "10px 12px",
                fontSize: 15,
                borderRadius: 12,
                border: "1px solid #E5E7EB",
                fontFamily: "plus-jakarta-sans, sans-serif",
              }}
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
                width: "100%",
                maxWidth: 560,
                height: 44,
                padding: "10px 12px",
                fontSize: 15,
                borderRadius: 12,
                border: "1px solid #E5E7EB",
                fontFamily: "plus-jakarta-sans, sans-serif",
              }}
            />
            {error && (
              <div
                style={{
                  color: "#dc2626",
                  background: "#fee2e2",
                  borderRadius: 8,
                  padding: "8px 12px",
                  margin: "8px 0",
                  fontSize: 14,
                  fontFamily: "plus-jakarta-sans, sans-serif",
                  maxWidth: 560,
                  width: "100%",
                  textAlign: "center",
                }}
              >
                {error}
              </div>
            )}
            <button
              onClick={handleSignup}
              style={{
                width: "100%",
                maxWidth: 560,
                height: 52,
                backgroundColor: "#0f172a",
                color: "#FFFFFF",
                fontSize: 15,
                fontWeight: 700,
                border: "none",
                borderRadius: 12,
                cursor: "pointer",
                marginTop: 6,
                fontFamily: "plus-jakarta-sans, sans-serif",
              }}
            >
              Sign Up
            </button>

            <div
              style={{
                display: "flex",
                gap: 6,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 6,
              }}
            >
              <p
                style={{
                  fontSize: 14,
                  color: "#6b7280",
                  margin: 0,
                  fontFamily: "plus-jakarta-sans, sans-serif",
                }}
              >
                Already have an account?
              </p>
              <Link
                to={routes.LOGIN}
                style={{
                  fontSize: 14,
                  color: "#7c3aed",
                  textDecoration: "none",
                }}
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
