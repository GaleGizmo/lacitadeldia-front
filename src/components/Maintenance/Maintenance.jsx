import { useEffect, useState } from "react";
import "./Maintenance.css"; // Asegúrate de crear estilos apropiados para este componente
import { notifyMe } from "../../shared/api";
import getOrCreateUUID from "../../customhooks/uuid";

const Maintenance = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [yourEmail, setYourEmail]=useState(localStorage.getItem("wantsNotification"))
  useEffect(() => {
    if (yourEmail) {
      setSubmitted(true);
    }
  }, [yourEmail]);
  // Función para manejar el envío del formulario
  const userId = getOrCreateUUID();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
     await notifyMe(userId, email);

      setSubmitted(true);
      localStorage.setItem("wantsNotification", email);
      setYourEmail(email)
    } catch (err) {
      setSubmitted(false);
    }
  };

  return (
    <div className="maintenance-container">
      <h1>CIERRE TEMPORAL</h1>
      <p>
        Gracias por jugar a la versión beta de Movie Quote, estamos trabajando
        para lanzar la versión final en pocas semanas, que vendrá además con
        novedades interesantes.
      </p>
      <p>
        Si deseas ser notificado cuando la aplicación vuelva a estar en línea,
        por favor, deja tu correo electrónico a continuación.
      </p>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="email-form">
          <input
            type="email"
            placeholder="Tu correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Notificarme</button>
        </form>
      ) : (
        
          <p>¡Gracias! Te notificaremos cuando volvamos a estar en línea en: {yourEmail}.</p>
        
      )}
    </div>
  );
};

export default Maintenance;
