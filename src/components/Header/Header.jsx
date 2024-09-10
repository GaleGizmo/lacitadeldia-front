import { Link } from "react-router-dom";
import Calendar from "../../assets/Calendar";
import "./header.css";
import Home from "../../assets/Home";
import Info from "../../assets/Info";
import { useDispatch } from "react-redux";
import { startGame } from "../../redux/game/game.actions";



const Header = () => {
  
  const dispatch = useDispatch()
  const userId = localStorage.getItem("laCitaDelDiaUserId");

  return (
    <div className="header">
     
      <div className="header-links-container">
        <Link to="/oldgames" className="header-link">
          <Calendar />{" "}
        </Link>
        <Link
          to="/game"
          onClick={() => {
            localStorage.removeItem("gameId");
           dispatch(startGame(userId, 0))
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
