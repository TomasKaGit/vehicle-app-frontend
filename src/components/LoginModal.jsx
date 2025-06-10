import React, { useState } from "react";
import api from "../axiosConfig";
import "../css/LoginModal.css";

function LoginModal({ setIsLoggedIn, onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    api
      .post("/auth/login", { username, password })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
        onClose();
      })
      .catch(() => {
        setError("Neteisingas vartotojo vardas arba slaptažodis.");
      });
  };

  return (
    <div className="modal-backdrop">
      <div className="login-modal">
        <h3>Prisijungti</h3>
        {error && <p className="error-msg">{error}</p>}

        <input
          type="text"
          placeholder="Vartotojo vardas"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Slaptažodis"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="modal-actions">
          <button onClick={handleLogin}>Prisijungti</button>
          <button onClick={onClose}>Atšaukti</button>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
