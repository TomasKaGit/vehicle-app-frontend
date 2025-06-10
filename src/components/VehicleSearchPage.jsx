import React, { useState } from "react";
import api from "../axiosConfig"; // pritaikytas axios su JWT token palaikymu
import "../Css/VehicleSearchPage.css"; // stilius

function VehicleSearchPage() {
  const [reg, setReg] = useState(""); // registracijos numerio įvestis
  const [vehicle, setVehicle] = useState(null); // paieškos rezultatas
  const [notFound, setNotFound] = useState(false); // ar rasta

  // Kai paspaudžiamas "Ieškoti"
  const handleSearch = async () => {
    try {
      const res = await api.get(`/vehicles/search?registration=${reg}`);
      setVehicle(res.data);
      setNotFound(false);
    } catch {
      setVehicle(null);
      setNotFound(true);
    }
  };

  return (
    <div className="search-container">
      <div className="search-box">
        <h3>🔍 Paieška pagal registracijos numerį</h3>
        <div className="search-form">
          <input
            type="text"
            value={reg}
            onChange={(e) => setReg(e.target.value)}
            placeholder="Įveskite registracijos nr. (pvz. ABC123)"
          />
          <button onClick={handleSearch}>Ieškoti</button>
        </div>

        {/* Jei nieko nerasta */}
        {notFound && <p style={{ color: "red" }}>Tokio automobilio nėra.</p>}

        {/* Jei rastas automobilis */}
        {vehicle && (
          <div className="vehicle-result">
            <p>
              <strong>Markė:</strong> {vehicle.brand}
            </p>
            <p>
              <strong>Modelis:</strong> {vehicle.model}
            </p>
            <p>
              <strong>Metai:</strong> {vehicle.year}
            </p>
            <p>
              <strong>Draudimas iki:</strong> {vehicle.insuranceExpiry}
            </p>
            <p>
              <strong>Tech apžiūra iki:</strong>{" "}
              {vehicle.technicalInspectionExpiry}
            </p>
            <p>
              <strong>Sugedęs:</strong> {vehicle.broken ? "Taip" : "Ne"}
            </p>
            <p>
              <strong>Padalinys:</strong> {vehicle.departmentName || "Nežinoma"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default VehicleSearchPage;
