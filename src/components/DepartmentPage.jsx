import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../axiosConfig";

import EmailList from "./department/EmailList";
import VehicleList from "./department/VehicleList";
import VehicleAddForm from "./department/VehicleAddForm";
import VehicleEditForm from "./department/VehicleEditForm";
import AddEmailForm from "./department/AddEmailForm";

import "../Css/DepartmentPage.css";
import "../Css/VehicleCard.css";

function DepartmentPage({ isLoggedIn, setRefreshDepartments }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [departmentName, setDepartmentName] = useState("");
  const [editName, setEditName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [emails, setEmails] = useState([]);
  const [showAllEmails, setShowAllEmails] = useState(false);
  const [showAddEmail, setShowAddEmail] = useState(false);

  const [vehicles, setVehicles] = useState([]);
  const [showAllVehicles, setShowAllVehicles] = useState(false);

  const [editVehicle, setEditVehicle] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    api
      .get(`/departments/${id}`)
      .then((res) => {
        setDepartmentName(res.data.name);
        setEditName(res.data.name);
        setNotFound(false);
      })
      .catch(() => setNotFound(true));

    api
      .get(`/emails/department/${id}`)
      .then((res) => setEmails(res.data))
      .catch(() => setEmails([]));

    api
      .get(`/vehicles/department/${id}`)
      .then((res) => setVehicles(res.data))
      .catch(() => setVehicles([]));
  }, [id]);

  const deleteDepartment = () => {
    if (window.confirm("Ar tikrai ištrinti padalinį?")) {
      api
        .delete(`/departments/${id}`)
        .then(() => {
          localStorage.setItem("departmentDeleted", "true");
          if (setRefreshDepartments) {
            setRefreshDepartments((prev) => prev + 1); // 🔁 Atnaujina dropdown
          }
          navigate("/");
        })
        .catch(() => alert("Nepavyko ištrinti padalinio."));
    }
  };

  const handleEditNameSave = () => {
    api
      .put(`/departments/${id}`, { id, name: editName })
      .then((res) => {
        setDepartmentName(res.data.name);
        setIsEditing(false);
      })
      .catch(() => alert("Nepavyko atnaujinti pavadinimo."));
  };

  if (notFound) {
    return (
      <div className="page-container">
        <h2>Padalinys nerastas arba buvo ištrintas.</h2>
        <button onClick={() => navigate("/")}>Grįžti į pagrindinį</button>
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* 🔹 Padalinio pavadinimas ir valdymas */}
      {isEditing ? (
        <div className="edit-name-form">
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <button onClick={handleEditNameSave}>💾 Išsaugoti</button>
          <button onClick={() => setIsEditing(false)}>✖️ Atšaukti</button>
        </div>
      ) : (
        <div className="department-title-bar">
          <h2 className="department-title">{departmentName}</h2>
          {isLoggedIn && (
            <div className="department-actions">
              <button onClick={deleteDepartment}>🗑️ Ištrinti</button>
              <button onClick={() => setIsEditing(true)}>✏️ Koreguoti</button>
            </div>
          )}
        </div>
      )}

      {/* 🔹 El. pašto adresai */}
      <div className="email-section">
        <h3 className="section-title">El. pašto adresai</h3>
        <EmailList
          emails={showAllEmails ? emails : emails.slice(0, 3)}
          setEmails={setEmails}
          departmentId={id}
          isLoggedIn={isLoggedIn}
        />
        {isLoggedIn && (
          <>
            <button
              onClick={() => setShowAddEmail(!showAddEmail)}
              className="add-button"
            >
              {showAddEmail ? "✖️ Atšaukti" : "➕ Pridėti el. pašto adresą"}
            </button>
            {showAddEmail && (
              <AddEmailForm departmentId={id} setEmails={setEmails} />
            )}
          </>
        )}
        {emails.length > 3 && (
          <button
            onClick={() => setShowAllEmails(!showAllEmails)}
            className="see-more-btn"
          >
            {showAllEmails ? "Rodyti mažiau" : "Rodyti visus"}
          </button>
        )}
      </div>

      {/* 🔹 Transporto priemonės */}
      <div className="vehicle-section">
        <h3 className="section-title">Automobiliai</h3>
        <VehicleList
          vehicles={showAllVehicles ? vehicles : vehicles.slice(0, 6)}
          setVehicles={setVehicles}
          setEditVehicle={setEditVehicle}
          isLoggedIn={isLoggedIn}
        />
        {vehicles.length > 6 && (
          <button
            onClick={() => setShowAllVehicles(!showAllVehicles)}
            className="see-more-btn"
          >
            {showAllVehicles ? "Rodyti mažiau" : "Rodyti visus"}
          </button>
        )}

        {isLoggedIn && showAddForm && (
          <VehicleAddForm
            departmentId={id}
            setVehicles={setVehicles}
            setShowAddForm={setShowAddForm}
          />
        )}

        {isLoggedIn && (
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="add-button"
          >
            {showAddForm
              ? "✖️ Atšaukti pridėjimą"
              : "➕ Pridėti naują automobilį"}
          </button>
        )}

        {isLoggedIn && (
          <VehicleEditForm
            editVehicle={editVehicle}
            setEditVehicle={setEditVehicle}
            departmentId={id}
            setVehicles={setVehicles}
          />
        )}
      </div>
    </div>
  );
}

export default DepartmentPage;
