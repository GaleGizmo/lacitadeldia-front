import { Link } from "react-router-dom";
import CalendarIcon from "../../assets/CalendarIcon";
import "./header.css";
import HomeIcon from "../../assets/HomeIcon";
import Info from "../../assets/InfoIcon";
import { useDispatch } from "react-redux";
import { startGame } from "../../redux/game/game.actions";

const Header = () => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("laCitaDelDiaUserId");

  return (
    <div className="header">
      <div className="header-links-container">
        <Link to="/oldgames" className="header-link">
          <CalendarIcon width="40" height="40" viewBox="2 3 20 18" />{" "}
        </Link>
        <Link
          to="/game"
          onClick={() => {
            localStorage.removeItem("gameId");
            dispatch(startGame(userId, 0));
          }}
          className="header-link"
        >
          <HomeIcon width="40" height="40" viewBox="2 3 20 18" />
        </Link>
        <Link to="/info" className="header-link">
          <Info width="40" height="40" viewBox="2 3 20 18" />
        </Link>{" "}
      </div>
    </div>
  );
};

export default Header;
