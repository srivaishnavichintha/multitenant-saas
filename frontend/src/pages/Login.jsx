import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [subdomain, setSubdomain] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
        tenantSubdomain: subdomain,
      });

      // handle both response shapes
      const token =
        res.data?.data?.token ||
        res.data?.token;

      if (!token) {
        console.error("Login response:", res.data);
        throw new Error("JWT token not found");
      }

      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "Login failed"
      );
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleLogin}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br /><br />

        <input
          placeholder="Tenant Subdomain"
          value={subdomain}
          onChange={(e) => setSubdomain(e.target.value)}
        /><br /><br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
