/* eslint-disable react/prop-types */
import { useState } from "react";
import "./NewUserBanner.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { updateDontShowInstructions } from "../../redux/user/user.actions";

const NewUserBanner = ({onClose}) => {
  const userId = localStorage.getItem("laCitaDelDiaUserId");
  const [noInstructionsStatus, setNoInstructionsStatus] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleShowInstructions = (e) => {
    const buttonContent = e.target.textContent;
    onClose()
    if (buttonContent === "SÍ") {
      navigate("/info");
    } else {
      navigate("/game");
    }
   
   
  };

 
  const handleCheckboxChange = (event) => {
    setNoInstructionsStatus(event.target.checked);
    if (userId) {
      
      dispatch(updateDontShowInstructions(userId, !noInstructionsStatus));
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="newuser-container">
        <p>¿Quieres ver las instrucciones del juego?</p>
        <button onClick={handleShowInstructions}>SÍ</button>
        <button onClick={handleShowInstructions}>NO</button>
        <br />
        <small className="dont-show-again">
          <label htmlFor="no-instructions">No volver a mostrar</label>
          <input
            type="checkbox"
            id="no-instructions"
            onChange={handleCheckboxChange}
          />
        </small>
      </div>
    </div>
  );
};

export default NewUserBanner;
