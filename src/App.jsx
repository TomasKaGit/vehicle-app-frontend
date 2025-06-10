import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import HomePage from "./components/HomePage";
import DepartmentListPage from "./components/DepartmentListPage";
import DepartmentPage from "./components/DepartmentPage";
import VehicleSearchPage from "./components/VehicleSearchPage";
import AddVehiclePage from "./components/AddVehiclePage";
import AddEmailPage from "./components/AddEmailPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const [refreshDepartments, setRefreshDepartments] = useState(0); // 🔄

  useEffect(() => {
    const status = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(status);
  }, []);

  return (
    <Router>
      {/* 🔝 Header gauna isLoggedIn ir refreshDepartments */}
      <Header
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        refreshDepartments={refreshDepartments}
      />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/departments" element={<DepartmentListPage />} />
        <Route
          path="/departments/:id"
          element={
            <DepartmentPage
              isLoggedIn={isLoggedIn}
              setRefreshDepartments={setRefreshDepartments} // 🔄 perduodame
            />
          }
        />
        <Route path="/search" element={<VehicleSearchPage />} />
        <Route path="/add-vehicle" element={<AddVehiclePage />} />
        <Route path="/add-email" element={<AddEmailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
