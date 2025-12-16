import backgroundImage from "../assets/background_image.jpg";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../utils/navigation";
import { authService } from '../services/auth.service';
import React, { useState } from "react";


function Login() {
  const navigate = useNavigate();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setError("");
      await authService.login(email, password);
      navigate(routes.DASHBOARD);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to Login");
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
          gap: 18,
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
              Welcome Back
            </h1>
            <p
              style={{
                fontSize: 14,
                color: "#6b7280",
                marginTop: 8,
                fontFamily: "plus-jakarta-sans, sans-serif",
              }}
            >
              Put in your details to Login to your account
            </p>
          </div>

          <form onSubmit={handleLogin} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <input
            type="email"
            value = {email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email Address"
            style={{
              width: "100%",
              maxWidth: 560,
              height: 44,
              padding: "10px 12px",
              fontSize: 15,
              borderRadius: 12,
              border: "1px solid #E5E7EB",
              fontFamily: "plus-jakarta-sans, sans-serif",
              marginBottom: 16
            }}
          />

          <input
            type= "password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
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
            onClick={handleLogin}
            style={{
              width: "100%",
              maxWidth: 600,
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
            Login
          </button>
          </form>
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
              Don't have an account?
            </p>
            <Link
              to={routes.SIGNUP}
              style={{ fontSize: 14, color: "#7c3aed", textDecoration: "none" }}
            >
              Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;


