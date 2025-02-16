import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const VITE_BASE_URL =
  import.meta.env.VITE_BASE_URL || "http://localhost:8080/api";

const OAuthCallback = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      // Store token in local storage
      localStorage.setItem("token", token);

      // Fetch user details using the token
      fetchUserProfile(token);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch(`${VITE_BASE_URL}/auth/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data); // Set user in context
        localStorage.setItem("user", JSON.stringify(data)); // Store user data

        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      navigate("/login");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg font-semibold">Authenticating... Please wait.</p>
    </div>
  );
};

export default OAuthCallback;
