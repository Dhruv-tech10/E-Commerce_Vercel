// src/Components/Auth/LoginCallback.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      // Normally, send code to backend to get profile info
      // For demo, we’ll just set a dummy name
      const googleUserName = "GoogleUser"; // Replace with real name from backend
      localStorage.setItem("userName", googleUserName);

      // Redirect to home page
      navigate("/login");
    } else {
      navigate("/");
    }
  }, [navigate]);

  return (
   <div className="min-h-screen flex items-center justify-center">
      <p>Logging in with Google...</p>
    </div>
  );
}