import React from "react";
import api from "../../axiosConfig";

function EmailList({ emails, setEmails, departmentId, isLoggedIn }) {
  const handleDelete = (emailId) => {
    if (window.confirm("Ar tikrai ištrinti el. paštą?")) {
      api.delete(`/emails/${emailId}`).then(() => {
        setEmails((prev) => prev.filter((e) => e.id !== emailId));
      });
    }
  };

  return (
    <div className="section">
      <table className="table">
        <tbody>
          {emails.map((email) => (
            <tr key={email.id}>
              <td>{email.email}</td>
              <td className="actions">
                {isLoggedIn && (
                  <button onClick={() => handleDelete(email.id)}>🗑️</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmailList;
