
import './RulesPage.css';

const RulesPage = () => {
  return (
    <div className="rules-container">
    
    <div className="rules-header">
        <h1>Reglas del Juego</h1>
      </div>
      
      <div className='rules-content'><section>
        <h2>Objetivo</h2>
        <p>¡Hola cinéfilo! El objetivo de este juego es descubrir la cita de una película en el menor número de intentos posible.</p>
      </section>

      <section>
        <h2>Cómo Jugar</h2>
        <ol>
          <li>Cada día a las 7AM se presenta una nueva cita de una película con sus letras ocultas.</li>
          <li>Tienes un máximo de intentos para adivinar la cita completa. El número de intentos dependerá de la dificultad de la cita.</li>
          <li>En cada intento, debes introducir una palabra de cinco letras.</li>
          <li>Puedes usar el teclado físico o el teclado en pantalla para enviar tu intento.</li>
          <li>Después de cada intento, se mostrarán las letras de la palabra introducida que están en la cita oculta:</li>
          <ul>
            <li><span className="correct">Verde</span>: La letra está en la cita.</li>
            
            <li><span className="absent">Gris</span>: La letra no está en la cita.</li>
          </ul>
         
          <li>Si descubres la cita completa (todas las letras deben ser visibles), aparecerá un botón que te dara acceso a la información detallada de la misma.</li>
          <li>Todas las partidas que se empiecen un día y no estén terminadas a las 7AM del día siguiente, se considerarán <span className='perdida'>PARTIDAS PERDIDAS</span>. </li>
        </ol>
      </section>

      <section>
        <h2>Dificultad</h2>
        <p>El número de intentos que tienes para adivinar la cita dependerá de la longitud de la misma así como de la cantidad de letras poco frecuentes que contenga.</p>
        <p>Las citas más fáciles pueden llegar a tener tan solo<strong> 3 intentos</strong>, mientras que las más complicadas podrán tener un máximo de <strong>7 intentos</strong>.</p>
      </section>
     <section>
      <h2>Sistema de Puntos y Pistas</h2>
      <p>Por cada letra de la cita que encuentres se sumarán <span className="correct">0.5 </span>puntos a tu marcador.</p>
      <p>Si descubres la cita completa se sumarán <span className="correct">15 </span>puntos adicionales a tu marcador.</p>
      <p>Los puntos que ganes cada día se conservarán siempre y cuando juegues en el mismo dispositivo y navegador.</p>
      <h3>Usar las pistas</h3>
      <p>En cada partida dispondrás de <strong>cuatro </strong>pistas.</p>
      <p>Cada pista solo se podrá usar una vez en la partida.</p>
      <p>Para usar cada pista deberás hacer click en su nombre, con lo que aparecerá una breve descripción de la misma junto con el botón para utilizarla.</p>
      <p>Las pistas que tienes son:</p>
      <ul>
        <li><strong>Letra</strong>: Se selecciona una letra al azar de la cita y se muestra en todas las posiciones de la cita en las que se encuentre. Coste: <span className='perdida'><strong>25 puntos</strong></span>.</li>
        <li><strong>Comunes</strong>: Muestra el número de letras comunes entre la palabra de cinco letras que hayas escrito en el tablero (antes de enviarla) y la cita. Por ejemplo, si escribes la palabra CEBRA y la cita contiene las letras C, R y E, al usar la pista se te dirá que hay tres letras comunes.Coste: <span className='perdida'><strong>25 puntos</strong></span>.</li>
        <li><strong>Actor</strong>: Muestra el nombre del actor que protagoniza la cita. Coste: <span className='perdida'><strong>15 puntos</strong></span>.</li>
        <li><strong>Director</strong>: Muestra el nombre del director de la película a la que pertenece la cita. Coste: <span className='perdida'><strong>15 puntos</strong></span>.</li>
      </ul>
      
     
     </section>

      <section>
        <h2>Consejos</h2>
        <ul>
          <li>Intenta usar palabras con letras lo más comunes posible.</li>
          <li>Presta atención a las letras que ya has usado e intenta no repetirlas.</li>
          <li>No uses la pista <strong>Letra</strong> demasiado pronto, así será más probable que te desvele una letra infrecuente.</li>
          
        </ul>
      </section>

      

      <section>
        <h2>Frases Antiguas</h2>
        <p>Puedes acceder a citas de días anteriores desde el calendario en la parte superior de la pantalla.</p>
        <p>Si hay citas de días anteriores que no has jugado, puedes intentar adivinarlas; ¡PERO RECUERDA!, en estas partidas se aplicará la misma regla que para la cita del día: es decir, si empiezas a jugar y no descubres la cita antes de las 7AM del día siguiente se considerará partida  <span className='perdida'>PERDIDA</span>.</p>
        <p>Para volver a la cita del día, usa el icono de la casa en la parte superior.</p>
      </section>
      <section>
        <h2>Contacto</h2>
        <p>Puedes contactar conmigo y ver otras webs que he creado <a href="https://www.miguelabelleira.es" target="_blank" rel="noopener noreferrer">
    AQUÍ
  </a></p>
      </section>
      <footer>
        <p>¡Diviértete jugando y mejora tus habilidades de deducción cada día!</p>
      </footer> </div>
    </div>
  );
};

export default RulesPage;