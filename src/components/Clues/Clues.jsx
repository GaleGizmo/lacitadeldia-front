import ClueDetails from "../ClueDetails/ClueDetails";
import "./Clues.css";
import { useState } from "react";

const Clues = () => {
  // const [showDetails, setShowDetails] = useState(false);
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

  const displayClueDetails = (e) => {
    const clickedClue = e.target.alt; // Usar 'alt' para identificar la imagen clicada
    if (clueName === clickedClue) {
      // setShowDetails(false);
      setClueName("");
      setSelectedClue("");
    } else {
      // setShowDetails(true);
      setClueName(clickedClue);
      setSelectedClue(clickedClue);
    }
  };

  return (
    <div className="clues">
      <div className="clues-button">¡AYUDA!</div>
      <div className="clues-display">
        <div className="clues-letras">
          <div  className={`clue-letra ${
              selectedClue === "Letra" ? "selected" : ""
            }`}><img
            src="../../src/assets/letra.png"
            alt="Letra"
            onClick={displayClueDetails}
           
            width={30}
            height={30}
          /> </div>
          <div  className={`clue-letra ${
              selectedClue === "Comunes" ? "selected" : ""
            }`}><img
            src="../../src/assets/compara_letras.png"
            alt="Comunes"
            onClick={displayClueDetails}
           
            width={30}
            height={30}
          /> </div>
           <div  className={`clue-letra ${
              selectedClue === "Actor" ? "selected" : ""
            }`}><img
            src="../../src/assets/actor.png"
            alt="Actor"
            onClick={displayClueDetails}
           
            width={30}
            height={30}
          /> </div>
          <div className={`clue-letra ${
              selectedClue === "Director" ? "selected" : ""
            }`}><img
            src="../../src/assets/director.png"
            alt="Director"
            onClick={displayClueDetails}
          
            width={30}
            height={30}
          /> </div>
        </div>
        
        <ClueDetails typeOfClue={codifyClueForBackend(clueName)} />
       
      </div>
    </div>
  );
};

export default Clues;
