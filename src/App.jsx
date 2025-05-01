import { useState, useEffect } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLog, setIsLog] = useState(false);

  useEffect(() => {
    // Check localStorage for login state
    const loggedIn = localStorage.getItem("isLog") === "true";
    const storedUser = localStorage.getItem("username");
    if (loggedIn && storedUser) {
      setIsLog(true);
      setUsername(storedUser);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      name: username,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const text = await response.text();

      if (response.ok) {
        setIsLog(true);
        setError("");
        localStorage.setItem("isLog", "true");
        localStorage.setItem("username", username);
      } else {
        setError(text || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login error: ", err);
      setError("Failed to connect to the server.");
    }
  };

  const handleLogout = () => {
    setIsLog(false);
    setUsername("");
    setPassword("");
    localStorage.removeItem("isLog");
    localStorage.removeItem("username");
  };

  if (isLog) {
    // Show Dashboard after login
    return (
      <div style={{ padding: "2rem", fontFamily: "Arial" }}>
        <h1>Welcome to ISTE Dashboard, {username} 👋</h1>
        <div style={{ marginTop: "1rem", background: "#e0e0e0", padding: "1rem", borderRadius: "8px" }}>
          <h3>📌 ISTE Updates</h3>
          <ul>
            <li>Hackathon – May 15th</li>
            <li>Workshop – May 20</li>
            <li>Weekly Meeting – Fridays 5 PM</li>
          </ul>
        </div>
        <button
          onClick={handleLogout}
          style={{
            marginTop: "2rem",
            padding: "0.5rem 1rem",
            backgroundColor: "#c62828",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    );
  }

  // Show Login Page
  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial" }}>
      {/* Left Info */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#1a237e",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>ISTE Student Chapter</h1>
        <p>
          Welcome to ISTE — a student club fostering innovation, leadership, and
          tech excellence.
        </p>
      </div>

      {/* Right Login */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <form
          onSubmit={handleLogin}
          style={{
            width: "100%",
            maxWidth: "300px",
            background: "#f0f0f0",
            padding: "2rem",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <h2>Login</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
            />
          </div>
          <button type="submit" style={{ width: "100%", padding: "0.5rem" }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
