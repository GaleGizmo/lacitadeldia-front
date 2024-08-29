import { Link } from "react-router-dom";
import Calendar from "../../assets/Calendar";
import "./header.css";
import Home from "../../assets/Home";
import Info from "../../assets/Info";
import Clues from "../Clues/Clues";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation(); // Obtener la ubicación actual

  const shouldHideClues = location.pathname === "/info" || location.pathname==="/oldgames"; // Verificar si la ruta es /info

  return (
    <div className="header">
      <div className="clues-container">
      {!shouldHideClues && <Clues />} 
       
      </div>
      <div className="header-links-container">
        <Link to="/oldgames" className="header-link">
          <Calendar />{" "}
        </Link>
        <Link
          to="/game"
          onClick={() => {
            localStorage.removeItem("gameId");
            window.location.href = "/";
          }}
          className="header-link"
        >
          <Home />
        </Link>
        <Link to="/info" className="header-link">
          <Info />
        </Link>{" "}
      </div>
    </div>
  );
};

export default Header;
