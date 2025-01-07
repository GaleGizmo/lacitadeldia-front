import  { useEffect, useState } from "react";
import "./InfoModal.css";

const InfoModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const checkDate = () => {
      const now = new Date();
      const day = now.getDate();
      const month = now.getMonth(); 
      const hour = now.getHours();

      // Mostrar el info-modal solo el 6 de enero a partir de las 7 de la mañana
      if (day === 6 && month === 0 && hour >= 7) {
        setIsOpen(true);
      }
    };

    checkDate();
  }, []);
  const closeModal = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="info-modal-overlay">
      <div className="info-modal-content">
       
        <h2>¡Pistas Gratis por el Día de Reyes!</h2>
        <p>
        🎄👑 Todas las pistas son <strong>gratis</strong> en la cita de hoy.
          ¡Aprovecha esta oportunidad para disfrutar al máximo del juego!🎄👑
        </p>
        <button className="action-button" onClick={closeModal}>
          ¡Entendido!
        </button>
      </div>
    </div>
  );
};

export default InfoModal;
