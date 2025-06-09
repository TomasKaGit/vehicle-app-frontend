import React, { useEffect, useState } from "react";
import api from "../../axiosConfig";

function VehicleEditForm({
  editVehicle,
  setEditVehicle,
  departmentId,
  setVehicles,
}) {
  const [form, setForm] = useState({ ...editVehicle });

  useEffect(() => {
    if (editVehicle) {
      setForm({ ...editVehicle });
    }
  }, [editVehicle]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        department: { id: parseInt(departmentId) },
        year: parseInt(form.year), // Jei year yra įvestas
      };

      const res = await api.put(`/vehicles/${form.id}`, payload);

      setVehicles((prev) => prev.map((v) => (v.id === form.id ? res.data : v)));

      setEditVehicle(null);
    } catch (err) {
      console.error("Klaida redaguojant automobilį:", err);
      alert("Nepavyko išsaugoti pakeitimų.");
    }
  };

  if (!editVehicle) return null;

  return (
    <form onSubmit={handleSave} style={{ marginTop: "20px" }}>
      <h4>✏️ Redaguoti automobilį</h4>

      <label>
        Markė:
        <input
          name="brand"
          value={form.brand || ""}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <label>
        Modelis:
        <input
          name="model"
          value={form.model || ""}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <label>
        Pagaminimo metai:
        <input
          type="number"
          name="year"
          value={form.year || ""}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <label>
        Registracijos numeris:
        <input
          name="registrationNumber"
          value={form.registrationNumber || ""}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <label>
        Draudimo pabaiga:
        <input
          type="date"
          name="insuranceExpiry"
          value={form.insuranceExpiry || ""}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <label>
        Techninės apžiūros pabaiga:
        <input
          type="date"
          name="technicalInspectionExpiry"
          value={form.technicalInspectionExpiry || ""}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <label>
        Sugedęs:
        <input
          type="checkbox"
          name="broken"
          checked={form.broken || false}
          onChange={handleChange}
        />
      </label>
      <br />

      <button type="submit">💾 Išsaugoti</button>
      <button type="button" onClick={() => setEditVehicle(null)}>
        ❌ Atšaukti
      </button>
    </form>
  );
}

export default VehicleEditForm;
