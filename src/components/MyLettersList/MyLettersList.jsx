/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { setInputFocus } from "../../redux/game/game.actions";
import "./MyLettersList.css";
import { useDispatch } from "react-redux";

const MyLettersList = ({ lettersFound }) => {
  let lettersListOnLocalStorage = localStorage.getItem("myLettersList") ||"";
  const dispatch = useDispatch();
  const [lettersList, setLettersList] = useState(lettersListOnLocalStorage);

  const handleMyLettersList = (e) => {
    e.preventDefault();
    const newValue = e.target.value.toUpperCase();
    setLettersList(newValue);
    localStorage.setItem("myLettersList", newValue);
  };

  useEffect(() => {
    if (!lettersFound || lettersFound.length === 0) return;

    let currentList = localStorage.getItem("myLettersList") || "";
    let updatedList = currentList
      .split("")
      .filter((char) => !lettersFound.includes(char.toUpperCase()))
      .join("");

    if (updatedList !== currentList) {
      setLettersList(updatedList);
      localStorage.setItem("myLettersList", updatedList);
    }
  }, [lettersFound]);

  return (
    <div className="my-letters-list ">
      <span>
        <img
          src="./assets/notepad.png"
          width={30}
          height={30}
          className="right-icon"
        />
      </span>
      <input
        className="input-field my-letters-input"
        type="text"
        maxLength={"12"}
        value={lettersList}
        onChange={handleMyLettersList}
        onFocus={() => dispatch(setInputFocus(true))}
        onBlur={() => dispatch(setInputFocus(false))}
      />
    </div>
  );
};
export default MyLettersList;
