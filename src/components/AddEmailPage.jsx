import React from "react";
import AddEmailForm from "../components/department/AddEmailForm"; // svarbu kelias

function AddEmailPage() {
  return (
    <div style={{ padding: "2rem" }}>
      <h2>📧 Pridėti el. pašto adresą</h2>
      <AddEmailForm />
    </div>
  );
}

export default AddEmailPage;
