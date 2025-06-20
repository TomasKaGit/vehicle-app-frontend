import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import LoginModal from "./LoginModal";
import api from "../axiosConfig";
import "../css/Header.css";

function Header({ isLoggedIn, setIsLoggedIn, refreshDepartments }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [newDeptName, setNewDeptName] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const location = useLocation();
  const dropdownRef = useRef(null);

  // 🔁 Gauti padalinių sąrašą iš backend
  const fetchDepartments = () => {
    api
      .get("/departments")
      .then((res) => {
        console.log("Padaliniai iš API:", res.data); // <-- pridėk šitą
        setDepartments(res.data);
      })
      .catch((err) => {
        console.error("Klaida gaunant padalinius:", err);
        setDepartments([]);
      });
  };

  // Pirmas užkrovimas
  useEffect(() => {
    fetchDepartments();
  }, []);

  // 🔁 Kai `refreshDepartments` pasikeičia — atnaujinti sąrašą
  useEffect(() => {
    fetchDepartments();
  }, [refreshDepartments]);

  // Paslėpti dropdown kai paspaudžiama šalia
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
        setShowAddForm(false);
        setNewDeptName("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Naujo padalinio pridėjimas
  const handleAddDepartment = () => {
    if (!newDeptName.trim()) return;
    api.post("/departments", { name: newDeptName }).then((res) => {
      setDepartments([...departments, res.data]);
      setNewDeptName("");
      setShowAddForm(false);
    });
  };

  // Prisijungimas / Atsijungimas
  const handleLoginClick = () => {
    if (isLoggedIn) {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("token");
      setIsLoggedIn(false);
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <header className="header">
      <h1 className="company-name">Vehicle Park System</h1>

      <nav className="menu-bar">
        <ul>
          <li>
            <NavLink to="/" className="menu-link">
              Pagrindinis
            </NavLink>
          </li>

          <li className="menu-item" ref={dropdownRef}>
            <button
              className="menu-link"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              Padaliniai
            </button>

            {showDropdown && (
              <div className="dropdown">
                {departments.length === 0 ? (
                  <div className="dropdown-item disabled">Padalinių nėra</div>
                ) : (
                  departments.map((dept) => (
                    <NavLink
                      key={dept.id}
                      to={`/departments/${dept.id}`}
                      className="dropdown-item"
                      onClick={() => setShowDropdown(false)}
                    >
                      {dept.name}
                    </NavLink>
                  ))
                )}

                {isLoggedIn && (
                  <>
                    <button
                      className="add-btn"
                      onClick={() => setShowAddForm(!showAddForm)}
                    >
                      ➕ Įvesti naują padalinį
                    </button>
                    {showAddForm && (
                      <div className="dropdown-form">
                        <input
                          type="text"
                          value={newDeptName}
                          onChange={(e) => setNewDeptName(e.target.value)}
                          placeholder="Padalinio pavadinimas"
                        />
                        <button onClick={handleAddDepartment}>Saugoti</button>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </li>

          <li>
            <NavLink to="/search" className="menu-link">
              Automobilio paieška
            </NavLink>
          </li>

          <li>
            <button className="menu-link" onClick={handleLoginClick}>
              {isLoggedIn ? "Atsijungti" : "Prisijungti"}
            </button>
          </li>
        </ul>
      </nav>

      {showLoginModal && (
        <LoginModal
          setIsLoggedIn={setIsLoggedIn}
          onClose={() => setShowLoginModal(false)}
        />
      )}
    </header>
  );
}

export default Header;
