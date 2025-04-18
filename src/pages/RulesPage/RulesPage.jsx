import { Link, useLocation } from "react-router-dom";
import "./RulesPage.css";
import CalendarIcon from "../../assets/CalendarIcon";
import UserManagementIcon from "../../assets/UserManagementIcon";
import { useEffect } from "react";

const RulesPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  return (
    <div className="rules-container">
      <div className="rules-header">
        <h1>Información del Juego</h1>
      </div>
      <div className="rules-content">
        <section>
          <h2>Objetivo</h2>
          <p>
            Descubre la cita de una película. Cada día a las 7AM se presenta una
            nueva cita con sus letras ocultas.
          </p>
        </section>
        <section>
          <h2>Cómo Jugar</h2>
          <ol>
            <li>
              Adivina la cita introduciendo palabras{" "}
              <strong>de cinco letras:</strong>
            </li>
            <img
              className="try-word-gif"
              src="assets/try_word.gif"
              alt="tryword"
            />
            <li>
              Las letras de cada palabra que estén en la cita se mostrarán en
              verde.
            </li>
            <img
              className="phrase-gif"
              src="assets/phrase_discover.gif"
              alt="Letra"
            />
            <li>
              <span className="lose-txt">No existe la opción</span> de resolver
              la frase completa de una sola vez.{" "}
            </li>
            <li>
              Las partidas no completadas antes de las <strong>7AM</strong> se
              considerarán <span className="lose-txt">PERDIDAS</span>.
            </li>
            <li>
              Si pierdes la partida necesitarás usar 5 puntos para ver los
              detalles de la cita.
            </li>
            <li>
              Al terminar una partida, podrás compartir el resultado de la misma
              en tus RRSS.
            </li>
          </ol>
        </section>
        <section>
          <h2>Dificultad</h2>
          <p>
            El número de intentos disponibles varía{" "}
            <strong> entre 3 y 7</strong> según la longitud de la cita y las
            letras poco comunes que contenga.
          </p>
        </section>
        <section>
          <h2>Puntos y Ayudas</h2>
          <ul>
            <li>
              <span className="win-txt">1 punto</span> por cada letra
              descubierta.
            </li>
            <li>
              <span className="win-txt">20 puntos</span> extra por completar la
              cita.
            </li>
            <li>
              <span className="win-txt">10 puntos</span> extra por cada intento
              no usado.
            </li>
          </ul>
          <div className="ranking-phrase">
            <span>Tus puntos determinarán tu posición en el ranking</span>{" "}
            <img
              className="ranking-icon"
              src="assets/ranking.png"
              alt="Ranking"
            />{" "}
          </div>
          <h3>Ayudas disponibles</h3>
          <img className="clues-png" src="assets/clues.png" alt="clues" />
          <br></br>
          <ul>
            <li>
              <img className="clue-icon" src="assets/letra.png" alt="Letra" />{" "}
              Revelar una letra al azar (20 puntos).
            </li>
            <li>
              <img
                className="clue-icon"
                src="assets/compara_letras.png"
                alt="Compara Letras"
              />{" "}
              Comparar letras comunes (10 puntos).
            </li>
            <li>
              <img className="clue-icon" src="assets/actor.png" alt="Actor" />{" "}
              Mostrar el actor (5 puntos).
            </li>
            <li>
              <img
                className="clue-icon"
                src="assets/director.png"
                alt="Director"
              />{" "}
              Mostrar el director (5 puntos).
            </li>
            <li>
              <img
                className="right-icon clue-icon"
                src="assets/notepad.png"
                alt="Notepad"
              />{" "}
              Apunta las letras que te faltan (gratuito).
            </li>
          </ul>
         
          <p>
            Tus puntos y resultados de partidas se conservarán si juegas en el
            mismo dispositivo y navegador{" "}
            <strong className="lose-txt">
              {" "}
              SALVO QUE TENGAS ACTIVADOS LOS MODOS INCÓGNITO (Android) O PRIVADO
              (iOS).
            </strong>
          </p>
          </section>
          <section>
          <h2 id="bonificaciones">Bonificaciones por rachas</h2>
          <div  className="bonus-container">
          
          <ul>
            <li>
              {" "}
              Jugar <span className="playing-txt">7</span> citas del día{" "}
              <strong>consecutivas:</strong> pistas <strong>ACTOR</strong>,{" "}
              <strong>DIRECTOR</strong> y <strong>COMPARAR LETRAS <span className="playing-txt">GRATIS  </span> </strong>en la cita del día siguiente.
            </li>
            <li>
              {" "}
              Ganar <span className="playing-txt">7</span> citas del día{" "}
              <strong>consecutivas:</strong> <strong>TODAS LAS PISTAS
              <span className="playing-txt"> GRATIS  </span> </strong>en la cita del día siguiente.
            </li>
            <li>
              Las rachas se reinician si no juegas la Cita del Día antes de las 7AM del día siguiente.
            </li>
            <li>
              Las citas de días anteriores <strong>no cuentan </strong>para las rachas.
            </li>
            <li>
              Las bonificaciones funcionarán <strong>SOLAMENTE</strong> el día posterior a completar una racha.
            </li>
          </ul>
          </div>
        </section>
        <section>
          <h2>Consejos</h2>
          <ul>
            <li>Usa primero palabras con letras comunes.</li>
            <li>No repitas letras ya usadas si puedes evitarlo.</li>
            <li>Reserva la pista de revelar letra para el final.</li>
          </ul>
        </section>
        <section>
          <h2>Citas Pasadas</h2>
          <CalendarIcon width="30" height="30" viewBox="2 3 20 18" />{" "}
          <p>Aquí puedes acceder a las citas de días anteriores. </p>
          <ul>
            <li>
              <span className="win-txt">Cita ganada.</span>
            </li>
            <li>
              <span className="lose-txt">Cita perdida</span>
            </li>
            <li>
              <span className="playing-txt">Cita en juego</span>
            </li>
            <li>
              <span className="np-txt">Cita no jugada</span>
            </li>
          </ul>
          <p>
            Si empiezas una cita anterior no jugada, debes completarla también
            antes de las 7AM del día siguiente.
          </p>
        </section>
        <section>
          <h2>Guardar/Restaurar Usuario</h2>
          <UserManagementIcon width="30" height="30" viewBox="2 3 20 18" />{" "}
          <p>La Cita Del Día guarda tu identificador de usuario en una cookie.</p>
          <p>
            {" "}
            Para evitar perder tu progreso en el juego es{" "}
            <span className="lose-txt">MUY RECOMENDABLE</span> guardar una copia
            de tu usuario usando el botón{" "}
            <strong>&quot;Guardar usuario&quot;</strong>.
          </p>{" "}
          <p>
            Ante un borrado de las cookies podrás restaurar tus datos con el
            botón <strong>&quot;Cargar Usuario&quot;</strong>.
          </p>
        </section>
      </div>
      <footer>
        <small>
          © 2024{" "}
          <a
            href="https://miguelabelleira.es"
            target="_blank"
            rel="noopener noreferrer"
          >
            Miguel Abelleira
          </a>
        </small>
        <small>
          {" "}
          <Link to="/privacy-policy">Política de Privacidad</Link>
        </small>
      </footer>
    </div>
  );
};

export default RulesPage;
