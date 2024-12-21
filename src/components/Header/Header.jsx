import { Link } from "react-router-dom";
import CalendarIcon from "../../assets/CalendarIcon";
import "./header.css";
import HomeIcon from "../../assets/HomeIcon";
import Info from "../../assets/InfoIcon";
import { useDispatch } from "react-redux";
import { startGame } from "../../redux/game/game.actions";
import ContactIcon from "../../assets/ContactIcon";
import UserManagementIcon from "../../assets/UserManagementIcon";

const Header = () => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("laCitaDelDiaUserId");

  return (
    <div className="header">
      <div className="header-links-container">
        <Link to="/contact" className="header-link">
          <ContactIcon width="30" height="30" viewBox="2 3 20 18" />{" "}
        </Link>
        <Link to="/oldgames" className="header-link">
          <CalendarIcon width="30" height="30" viewBox="2 3 20 18" />{" "}
        </Link>
        <h1>LA CITA DEL DÍA</h1>
        <Link
          to="/game"
          onClick={() => {
            localStorage.removeItem("gameId");
            dispatch(startGame(userId, 0));
          }}
          className="header-link"
        >
          <HomeIcon width="30" height="30" viewBox="2 3 20 18" />
        </Link>
        <Link to="/usermanager" className="header-link">
          <UserManagementIcon width="30" height="30" viewBox="2 3 20 18" />
        </Link>{" "}
        <Link to="/info" className="header-link">
          <Info width="30" height="30" viewBox="2 3 20 18" />
        </Link>{" "}
      </div>
    </div>
  );
};

export default Header;
