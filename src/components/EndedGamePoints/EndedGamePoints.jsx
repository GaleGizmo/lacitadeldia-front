import { PropTypes } from "prop-types";
import "./endedGamePoints.css";

const EndedGamePoints = ({
  gameClues,
  earnedPoints,
  gameResult,
  remainingChances,
}) => {
  let className = "";
  let gameResultText = "";
  let extraPoints = 0;
  let winPoints = 0;
  const isAWin = gameResult === "win";

  if (isAWin) {
    className = "won-game-text";
    gameResultText = "JUEGO GANADO";
    extraPoints = remainingChances * 10;
    winPoints = 20;
  } else {
    className = "lost-game-text";
    gameResultText = "JUEGO PERDIDO";
  }

  const calculateLetterPoints = () => {
    return earnedPoints - (winPoints + extraPoints);
  };

  const calculateCluesPoints = () => {
    if (!gameClues || Object.keys(gameClues).length === 0) return 0;
    return Object.values(gameClues).reduce((total, clue) => {
      if (!clue) return total;
      // Las pistas usadas tienen `status === false`; sumar su `price`
      if (clue.status === false) {
        return total + clue.price;
      }
      return total;
    }, 0);
  };

  return (
    <div className="ended-game-points-container">
      <p className={`right-div-container ${className}`}>{gameResultText}</p>
      <div className="right-div-container ended-game-points-details">
        <p>TOTAL PUNTOS:<span className="points"> {earnedPoints - calculateCluesPoints()}</span></p>
        <ul>
          <li>
            Letras:{" "}
            <span className="rank points-wrapper win-txt">{calculateLetterPoints()}</span>
          </li>
          <li>
           Victoria:{" "}
            <span className="rank points-wrapper win-txt">{winPoints || "0"}</span>
          </li>
          <li>
           Intentos sobrantes:{" "}
            <span className="rank points-wrapper win-txt">{extraPoints || "0"}</span>
          </li>
          <li>
            Usados en pistas:{" "}
            <span className="lose-txt">-{calculateCluesPoints()}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

EndedGamePoints.propTypes = {
  gameClues: PropTypes.object,
  earnedPoints: PropTypes.number.isRequired,
  gameResult: PropTypes.string.isRequired,
  remainingChances: PropTypes.number.isRequired,
};

export default EndedGamePoints;
