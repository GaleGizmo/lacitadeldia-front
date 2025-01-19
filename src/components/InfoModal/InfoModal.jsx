/* eslint-disable react/prop-types */

import "./InfoModal.css";

const InfoModal = ({ isOpen, title, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="info-modal-overlay">
      <div className="info-modal-content">
        <h2>{title}</h2>
        <p>{message}</p>
        <button className="action-button" onClick={onClose}>
          ¡Entendido!
        </button>
      </div>
    </div>
  );
};

export default InfoModal;
