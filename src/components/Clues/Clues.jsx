import ClueDetails from "../ClueDetails/ClueDetails";
import ShowPoints from "../ShowPoints/ShowPoints";
import "./Clues.css";
import { useState } from "react";

const Clues = () => {
  const [showClue, setShowClue] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [clueName, setClueName] = useState("");
  const [selectedClue, setSelectedClue] = useState("");

  const codifyClueForBackend = (clue) => {
    switch (clue) {
      case "Letra":
        return "letter";
      case "Comunes":
        return "lettersRight";
      case "Actor":
        return "actor";
      case "Director":
        return "director";
      default:
        return "";
    }
  };
  const handleShowClue = () => {
    setShowClue(!showClue);
    if (showDetails) {
      setShowDetails(false);
      setClueName("");
      setSelectedClue("");
    }
  };

  const displayClueDetails = (e) => {
    const clickedClue = e.target.textContent;
    if (clueName === clickedClue) {
      setShowDetails(false);
      setClueName("");
      setSelectedClue("");
    } else {
      setShowDetails(true);
      setClueName(clickedClue);
      setSelectedClue(clickedClue);
    }
  };

  return (
    <div className="clues">
      <button className="clues-button" onClick={handleShowClue}>
        ¡Dame una pista!
      </button>
      {showClue && (
        <div className="clues-display">
          <div className="clues-letras">
            <p
              onClick={displayClueDetails}
              className={`clue-letra ${
                selectedClue === "Letra" ? "selected" : ""
              }`}
            >
              Letra
            </p>
            <p
              onClick={displayClueDetails}
              className={`clue-letra ${
                selectedClue === "Comunes" ? "selected" : ""
              }`}
            >
              Comunes
            </p>{" "}
          </div>
          <div className="clues-letras">
            <p
              onClick={displayClueDetails}
              className={`clue-letra ${
                selectedClue === "Actor" ? "selected" : ""
              }`}
            >
              Actor
            </p>
            <p
              onClick={displayClueDetails}
              className={`clue-letra ${
                selectedClue === "Director" ? "selected" : ""
              }`}
            >
              Director
            </p>
          </div>
          <ClueDetails typeOfClue={codifyClueForBackend(clueName)} />
          <ShowPoints />
        </div>
      )}
    </div>
  );
};
export default Clues;
