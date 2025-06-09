import React, { useEffect, useState } from "react";
import api from "../../axiosConfig";

function AddEmailForm({ departmentId, setEmails }) {
  const [email, setEmail] = useState("");

  // Prideda el. paštą POST metodu
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    api
      .post("/emails", { email, departmentId })
      .then((res) => {
        setEmails((prev) => [...prev, res.data]);
        setEmail(""); // Išvalom lauką
      })
      .catch((err) => {
        console.error("Nepavyko pridėti el. pašto:", err);
        alert("Klaida pridedant el. paštą");
      });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
      <input
        type="email"
        placeholder="El. pašto adresas"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit" style={{ marginLeft: "0.5rem" }}>
        ➕ Pridėti
      </button>
    </form>
  );
}

export default AddEmailForm;
