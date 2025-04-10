import { useSelector } from "react-redux";
import "./Strike.css";
import { Link } from "react-router-dom";
const Strikes = () => {
  const { playingStrike, winningStrike } = useSelector(
    (state) => state.userReducer
  );

  return (
    <div className="strikes-container">
      <h2>MIS RACHAS</h2>
      <div className="strike-container">
        <p className="strike-name">JUGADAS</p>
        <p className="strike-data playing-data">{playingStrike}/7</p>
      </div>
      <div className="strike-container">
        <p className="strike-name">GANADAS</p>
        <p className="strike-data winning-data">{winningStrike}/7</p>
      </div>
      <p className="strike-info">¡Completa una racha y consigue <Link to="/info#bonificaciones">pistas gratis</Link>!</p>
    </div>
  );
};
export default Strikes;
