import "./RulesPage.css";

const RulesPage = () => {
  return (
    <div className="rules-container">
      <div className="rules-header">
        <h1>Reglas del Juego</h1>
      </div>

      <div className="rules-content">
        <section>
          <h2>Objetivo</h2>
          <p>
            ¡Hola cinéfilo! El objetivo de este juego es descubrir la cita de
            una película.
          </p>
        </section>
        <section>
          <h2>Cómo Jugar</h2>
          <ol>
            <li>
              Cada día <strong>a las 7AM</strong> se presenta una nueva cita de
              una película con sus letras ocultas.
            </li>
            <li>
              Tienes un máximo de intentos para adivinar la cita completa. El
              número de intentos dependerá de la dificultad de la cita.
            </li>
            <li>
              En cada intento, debes introducir una palabra{" "}
              <strong>de cinco letras:</strong>
            </li>
            <img
              className="try-word-gif"
              src="../../src/assets/try_word.gif"
              alt="tryword"
            />
            <li>
              Puedes usar el teclado físico o el teclado en la zona inferior de
              la pantalla para enviar tu intento.
            </li>
            <li>
              Después de cada intento, se mostrarán las letras de la palabra
              introducida que están en la cita oculta:
            </li>
            <img
              className="phrase-gif"
              src="../../src/assets/phrase_discover.gif"
              alt="Letra"
            />

            <li>
              Si descubres la cita completa (todas las letras deben estar en
              verde), podrás ver la información detallada de la misma.
            </li>
            <li>
              Todas las partidas que se empiecen un día y no estén terminadas a
              las 7AM del día siguiente, se considerarán{" "}
              <span className="perdida">PARTIDAS PERDIDAS</span>.{" "}
            </li>
          </ol>
        </section>
        <section>
          <h2>Dificultad</h2>
          <p>
            El número de intentos que tienes para adivinar la cita dependerá de
            la longitud de la misma así como de la cantidad de letras poco
            frecuentes que contenga.
          </p>
          <p>
            Las citas más fáciles pueden llegar a tener tan solo
            <strong> 3 intentos</strong>, mientras que las más complicadas
            podrán tener un máximo de <strong>6 intentos</strong>.
          </p>
        </section>
        <section>
          <h2>Sistema de Puntos y Pistas</h2>
          <p>
            Por cada letra de la cita que encuentres se sumará{" "}
            <span className="correct">1 punto</span> a tu marcador.
          </p>
          <p>
            Si descubres la cita completa se sumarán{" "}
            <span className="correct">20 puntos</span> adicionales a tu
            marcador.
          </p>
          <p>
            Si además eres tan crack que te han sobrado intentos, sumarás
            <span className="correct">10 puntos</span> adicionales a tu
            marcador por cada uno de ellos.
          </p>
          <p>
            Los puntos que ganes cada día se conservarán siempre y cuando
            juegues en el mismo dispositivo y navegador.
          </p>
          <h3>Usar las pistas</h3>
          <p>
            En cada partida dispondrás de <strong>cuatro </strong>pistas:
          </p>
          <img
            className="clues-png"
            src="../../src/assets/clues.png"
            alt="clues"
          />
          <p>Cada pista solo se podrá usar una vez en la partida.</p>
          <p>
            Para usar cada pista deberás hacer click en su icono, tras lo que
            aparecerá una breve descripción de la misma junto con el botón para
            utilizarla y su <strong>coste en puntos</strong>.
          </p>
          <p>Las pistas de las que dispones son:</p>
          <ul>
            <li>
              <img className="clue-icon" src="../../src/assets/letra.png" alt="Letra" /> Se selecciona
              una letra al azar de la cita y se muestra
              <strong> en todas las posiciones</strong> de la cita en las que se
              encuentre. Coste:{" "}
              <span className="perdida">
                <strong>30 puntos</strong>
              </span>
              .
            </li>
            <li>
              <img className="clue-icon" src="../../src/assets/compara_letras.png" alt="Letra" />{" "}
              Muestra el número de <strong>letras comunes</strong> (de entre las
              no reveladas) entre una palabra de cinco letras y la cita. Por
              ejemplo, si escribes la palabra <strong>CEBRA</strong> y la cita
              contiene las letras <strong>C, R y E</strong>, pero la E ya está
              revelada, al usar la pista se te dirá que hay{" "}
              <strong>dos letras</strong> comunes(la C y la R). Coste:{" "}
              <span className="perdida">
                <strong>25 puntos</strong>
              </span>
              .
            </li>
            <li>
              <img className="clue-icon" src="../../src/assets/actor.png" alt="Letra" /> Muestra el
              nombre del<strong> actor</strong> que protagoniza la cita. Coste:{" "}
              <span className="perdida">
                <strong>15 puntos</strong>
              </span>
              .
            </li>
            <li>
              <img className="clue-icon" src="../../src/assets/director.png" alt="Letra" /> Muestra el
              nombre del <strong>director</strong> de la película a la que
              pertenece la cita. Coste:{" "}
              <span className="perdida">
                <strong>15 puntos</strong>
              </span>
              .
            </li>
          </ul>
        </section>
        <section>
          <h2>Consejos</h2>
          <ul>
            <li>
              Al principio, intenta usar palabras con las letras más comunes.
            </li>
            <li>
              Presta atención a las letras que ya has usado e intenta no
              repetirlas.
            </li>
            <li>
              No uses la pista de revelar letra al inicio, así será más probable
              que te desvele una letra infrecuente.
            </li>
          </ul>
        </section>
        <section>
          <h2>Citas Pasadas</h2>
          <p>
            Puedes acceder a citas de días anteriores desde el calendario en la
            parte superior de la pantalla.
          </p>
          <p>
            Si hay citas de días anteriores que no has jugado, puedes intentar
            adivinarlas; ¡PERO RECUERDA!, en estas partidas se aplicará la <strong>misma
            regla que para la cita del día</strong>: es decir, si empiezas a jugar y no
            descubres la cita antes de las 7AM del día siguiente se considerará
            partida <span className="perdida">PERDIDA</span>.
          </p>
          <p>
            Para volver a la cita del día, usa el icono de la casa en la parte
            superior.
          </p>
        </section>
        <section>
          <h2>Contacto</h2>
          <p>
            Puedes contactar conmigo y ver otras webs que he creado{" "}
            <a
              href="https://www.miguelabelleira.es"
              target="_blank"
              rel="noopener noreferrer"
            >
              AQUÍ
            </a>
          </p>
        </section>
        <footer>
          <p>
            ¡Diviértete jugando y mejora tus habilidades de deducción cada día!
          </p>
        </footer>{" "}
      </div>
    </div>
  );
};

export default RulesPage;
