import React, { useState } from "react";
import api from "../../axiosConfig";

function VehicleAddForm({ departmentId, setVehicles, setShowAddForm }) {
  const [vehicle, setVehicle] = useState({
    brand: "",
    model: "",
    year: "",
    registrationNumber: "",
    insuranceExpiry: "",
    technicalInspectionExpiry: "",
    broken: false,
  });

  // Kiekvieno įvesties lauko keitimas (valdymas per state)
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setVehicle((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Formos išsiuntimas
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...vehicle,
      department: { id: parseInt(departmentId) },
    };

    try {
      const res = await api.post("/vehicles", payload);
      setVehicles((prev) => [...prev, res.data]); // Atnaujinam sąrašą
      setShowAddForm(false); // Uždaryti formą po įvedimo
    } catch (err) {
      console.error("Klaida pridedant automobilį:", err);
      alert("Nepavyko pridėti automobilio.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="vehicle-form">
      <h4 style={{ marginBottom: "0.5rem" }}>➕ Naujas automobilis</h4>

      <label>
        Markė:
        <input
          name="brand"
          value={vehicle.brand}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Modelis:
        <input
          name="model"
          value={vehicle.model}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Metai:
        <input
          name="year"
          value={vehicle.year}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Reg. nr.:
        <input
          name="registrationNumber"
          value={vehicle.registrationNumber}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Draudimas iki:
        <input
          type="date"
          name="insuranceExpiry"
          value={vehicle.insuranceExpiry}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Tech. apžiūra iki:
        <input
          type="date"
          name="technicalInspectionExpiry"
          value={vehicle.technicalInspectionExpiry}
          onChange={handleChange}
          required
        />
      </label>

      <label className="checkbox-inline">
        Sugedęs:
        <input
          type="checkbox"
          name="broken"
          checked={vehicle.broken}
          onChange={handleChange}
        />
      </label>

      <div style={{ marginTop: "1rem" }}>
        <button type="submit">💾 Įvesti automobilį</button>
      </div>
    </form>
  );
}

export default VehicleAddForm;
