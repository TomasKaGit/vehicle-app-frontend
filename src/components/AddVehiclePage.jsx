import React from "react";
import AddVehicleForm from "../components/department/VehicleAddForm"; // svarbu kelias!

function AddVehiclePage() {
  return (
    <div style={{ padding: "2rem" }}>
      <h2>➕ Pridėti naują automobilį</h2>
      <AddVehicleForm />
    </div>
  );
}

export default AddVehiclePage;
