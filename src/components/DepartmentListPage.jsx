import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../axiosConfig";
import "../css/DepartmentListPage.css";

function DepartmentListPage() {
  const [departments, setDepartments] = useState([]); // Padalinių sąrašas

  // Padalinių užkrovimas iš backend
  const fetchDepartments = () => {
    api
      .get("/departments")
      .then((res) => setDepartments(res.data))
      .catch((err) => {
        console.error("❌ Klaida gaunant padalinius:", err);
        setDepartments([]); // Jei klaida, išvalom sąrašą
      });
  };

  // useEffect kviečia fetch tik vieną kartą kai užsikrauna komponentas
  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <div className="department-list">
      <h2>Padaliniai</h2>
      <ul>
        {departments.map((dept) => (
          <li key={dept.id}>
            {/* Perėjimas į konkretų padalinio puslapį */}
            <Link to={`/departments/${dept.id}`}>{dept.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DepartmentListPage;
