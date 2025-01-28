import React from "react";
import "./SessionModal.css";

const SessionModal = ({ show, onClose, onConfirm }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Session Timed Out</h3>
        <p>Do you want to stay signed in?</p>
        <div className="modal-actions">
          <button className="btn-confirm" onClick={onClose}>
            Yes
          </button>
          <button className="btn-cancel" onClick={onConfirm}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionModal;
