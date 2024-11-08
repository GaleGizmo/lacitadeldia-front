import { Link } from "react-router-dom";
import "./RulesPage.css";

const RulesPage = () => {
  return (
    <div className="rules-container">
      <div className="rules-header">
        <h1>Información del Juego</h1>
      </div>
      <div className="rules-content">
        <section>
          <h2>Objetivo</h2>
          <p>
            Descubre la cita de una película. Cada día a las 7AM se presenta
            una nueva cita con sus letras ocultas.
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
            <li>Las letras de cada palabra que estén en la cita se mostrarán en verde.</li>
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
              Las partidas no completadas antes de las 7AM se consideran{" "}
              <span className="lose-txt">PERDIDAS</span>.
            </li>
            <li>
              Al terminar una partida, tendrás la posibilidad de compartir el
              resultado de la misma en tus RRSS.
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
          <h2>Puntos y Pistas</h2>
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
          <div className="ranking-phrase"><span>Tus puntos determinarán tu posición en el ranking</span> <img className="ranking-icon" src="assets/ranking.png" alt="Ranking" /> </div>
          <h3>Pistas disponibles</h3>
          <img className="clues-png" src="assets/clues.png" alt="clues" />
          <br></br>
          <ul>
            <li>
              <img className="clue-icon" src="assets/letra.png" alt="Letra" />{" "}
              Revelar una letra al azar (30 puntos).
            </li>
            <li>
              <img
                className="clue-icon"
                src="assets/compara_letras.png"
                alt="Compara Letras"
              />{" "}
              Comparar letras comunes (20 puntos).
            </li>
            <li>
              <img className="clue-icon" src="assets/actor.png" alt="Actor" />{" "}
              Mostrar el actor (10 puntos).
            </li>
            <li>
              <img
                className="clue-icon"
                src="assets/director.png"
                alt="Director"
              />{" "}
              Mostrar el director (10 puntos).
            </li>
          </ul>
          <p>Cada pista se podrá usar una vez por partida.</p>
          <p>
            Tus puntos y resultados de partidas se conservarán si juegas en el
            mismo dispositivo y navegador{" "}
            <strong className="lose-txt">
              {" "}
              SALVO QUE TENGAS ACTIVADO LOS MODOS INCÓGNITO (Android) O PRIVADO
              (iOS)
            </strong>
            .
          </p>
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
          <p>
            Accede a citas anteriores con el calendario. Si empiezas una cita
            pasada, debes completarla antes de las 7AM del día siguiente para no
            perderla.
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
