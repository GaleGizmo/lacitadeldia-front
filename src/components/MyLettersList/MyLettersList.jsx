import { useState } from "react";
import { setInputFocus } from "../../redux/game/game.actions";
import "./MyLettersList.css";
import { useDispatch } from "react-redux";

const MyLettersList = () => {
  const dispatch = useDispatch();
  const [lettersList, setLettersList] = useState("");



  return (
    <div className="my-letters-list">
      <span >
        <img src="./assets/notepad.png"  width={30} height={30} className='right-icon' />
      </span>
      <input
        className="input-field my-letters-input"
        type="text"
        maxLength={"12"}
        value={lettersList}
        onChange={(e) => setLettersList(e.target.value.toLocaleUpperCase())}
        onFocus={() => dispatch(setInputFocus(true))}
        onBlur={() => dispatch(setInputFocus(false))}
        
      />
    </div>
  );
};
export default MyLettersList;
