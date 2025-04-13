/* eslint-disable react/prop-types */

import "./InfoModal.css";

const InfoModal = ({ isOpen, title, message, onClose }) => {
  if (!isOpen) return null;
  const containsHtml = /<\/?[a-z][\s\S]*>/i.test(message);
  return (
    <div className="info-modal-overlay">
      <div className="info-modal-content">
        <h2>{title}</h2>
        {containsHtml ? (
          <div dangerouslySetInnerHTML={{ __html: message }} />
        ) : (
          <div>{message}</div>
        )}
        <button className="action-button" onClick={onClose}>
          ¡Entendido!
        </button>
      </div>
    </div>
  );
};

export default InfoModal;
