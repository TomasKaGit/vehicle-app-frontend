import React from "react";
import { format } from "date-fns";
import "../../Css/VehicleCard.css"; // Užtikrink, kad šis failas egzistuoja

function VehicleCard({ vehicle }) {
  // Nustato CSS klasę pagal datų galiojimo laiką
  const getDateClass = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const daysLeft = (date - now) / (1000 * 60 * 60 * 24);

    if (daysLeft < 0) return "expired";
    if (daysLeft < 30) return "warning";
    return "";
  };

  // Bendra kortelės klasė – jei bent viena iš datų pasibaigus ar artėja
  const cardClass =
    getDateClass(vehicle.insuranceExpiry) === "expired" ||
    getDateClass(vehicle.technicalInspectionExpiry) === "expired"
      ? "expired"
      : getDateClass(vehicle.insuranceExpiry) === "warning" ||
        getDateClass(vehicle.technicalInspectionExpiry) === "warning"
      ? "warning"
      : "";

  return (
    <div className={`vehicle-card ${cardClass}`}>
      <h3>
        {vehicle.brand} {vehicle.model} ({vehicle.registrationNumber})
      </h3>

      <p>
        <strong>Draudimas iki:</strong>{" "}
        {format(new Date(vehicle.insuranceExpiry), "yyyy-MM-dd")}
      </p>

      <p>
        <strong>Tech. apžiūra iki:</strong>{" "}
        {format(new Date(vehicle.technicalInspectionExpiry), "yyyy-MM-dd")}
      </p>

      <p>
        <strong>Būklė:</strong>{" "}
        {vehicle.broken ? <span className="broken">Sugedęs</span> : "Veikia"}
      </p>

      <p>
        <strong>Padalinys:</strong> {vehicle.departmentName || "Nežinomas"}
      </p>
    </div>
  );
}

export default VehicleCard;
