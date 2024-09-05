import { Link } from "react-router-dom";
import Calendar from "../../assets/Calendar";
import "./header.css";
import Home from "../../assets/Home";
import Info from "../../assets/Info";



const Header = () => {
  

  

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
