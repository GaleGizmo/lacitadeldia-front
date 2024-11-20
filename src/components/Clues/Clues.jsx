import ClueDetails from "../ClueDetails/ClueDetails";
import "./Clues.css";
import { useState } from "react";

const Clues = () => {
  
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
      
      setClueName("");
      setSelectedClue("");
    } else {
      
      setClueName(clickedClue);
      setSelectedClue(clickedClue);
    }
  };

  return (
    <div className="clues ">
     
      
        <div className="clues-icons">
          <div  className={`clue-icon ${
              selectedClue === "Letra" ? "selected" : ""
            }`}><img
            src="assets/letra.png"
            alt="Letra"
            onClick={displayClueDetails}
           
            width={30}
            height={30}
          /> </div>
          <div  className={`clue-icon ${
              selectedClue === "Comunes" ? "selected" : ""
            }`}><img
            src="assets/compara_letras.png"
            alt="Comunes"
            onClick={displayClueDetails}
           
            width={30}
            height={30}
          /> </div>
           <div  className={`clue-icon ${
              selectedClue === "Actor" ? "selected" : ""
            }`}><img
            src="assets/actor.png"
            alt="Actor"
            onClick={displayClueDetails}
           
            width={30}
            height={30}
          /> </div>
          <div className={`clue-icon ${
              selectedClue === "Director" ? "selected" : ""
            }`}><img
            src="assets/director.png"
            alt="Director"
            onClick={displayClueDetails}
          
            width={30}
            height={30}
          /> </div>
        </div>
        
        <ClueDetails typeOfClue={codifyClueForBackend(clueName)} />
       
     
    </div>
  );
};

export default Clues;
