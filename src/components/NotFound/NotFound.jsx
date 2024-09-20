
import "./NotFound.css"; 

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h2>Oops... ¡Parece que te has perdido!</h2>
      <p>
        No podemos encontrar lo que estás buscando, pero no te preocupes, aún
        puedes regresar a la civilización.
      </p>
      <p>¡Pincha en cualquiera de los iconos de arriba para volver al juego!</p>
     
      <div className="not-found-image">
        {/* Aquí puedes agregar una imagen divertida o un ícono */}
        <img src="assets/travolta.gif" alt="Lost" />
      </div>
    </div>
  );
};

export default NotFound;
