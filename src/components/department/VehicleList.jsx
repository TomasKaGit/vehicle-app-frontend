import React from "react";
import api from "../../axiosConfig";

function VehicleList({ vehicles, setVehicles, setEditVehicle, isLoggedIn }) {
  const handleDelete = (id) => {
    if (window.confirm("Ar tikrai ištrinti šį automobilį?")) {
      api.delete(`/vehicles/${id}`).then(() => {
        setVehicles((prev) => prev.filter((v) => v.id !== id));
      });
    }
  };

  const getRowClass = (vehicle) => {
    const now = new Date();
    const insurance = new Date(vehicle.insuranceExpiry);
    const tech = new Date(vehicle.technicalInspectionExpiry);
    const minDate = new Date(Math.min(insurance, tech));
    const days = (minDate - now) / (1000 * 60 * 60 * 24);

    if (days < 0) return "expired";
    if (days < 30) return "warning";
    return "";
  };

  return (
    <div className="section">
      <table className="table">
        <thead>
          <tr>
            <th>Markė / Modelis</th>
            <th>Reg. nr.</th>
            <th>Metai</th>
            <th>Draudimas iki</th>
            <th>Tech. apžiūra iki</th>
            <th>Būsena</th>
            <th className="actions">Veiksmai</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id} className={getRowClass(vehicle)}>
              <td>
                {vehicle.brand} {vehicle.model}
              </td>
              <td>{vehicle.registrationNumber}</td>
              <td>{vehicle.year}</td>
              <td>{vehicle.insuranceExpiry}</td>
              <td>{vehicle.technicalInspectionExpiry}</td>
              <td className={vehicle.broken ? "broken-text" : ""}>
                {vehicle.broken ? "Sugedęs" : "Veikiantis"}
              </td>
              <td className="actions">
                {isLoggedIn && (
                  <>
                    <button onClick={() => setEditVehicle(vehicle)}>✏️</button>
                    <button onClick={() => handleDelete(vehicle.id)}>🗑️</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VehicleList;
