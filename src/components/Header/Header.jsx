import { Link } from "react-router-dom";
import Calendar from "../../assets/Calendar";
import "./header.css";

const Header = () => {
  return (
    <div className="header">
      <Link to="/oldgames" className="calendar-link">
        
          <Calendar />{" "}
      
      </Link>
    </div>
  );
};

export default Header;
