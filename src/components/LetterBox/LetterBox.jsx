
import PropTypes from "prop-types";
import "./letterBox.css"

function LetterBox({isBoxActive, boxContent, letterClass}) {
  const activeClass = isBoxActive ? "active" : "";
  // const letterBoxClass = isLetterInPhrase ? "in-phrase" : "not-in-phrase";
  
  return (
    <div className={`letter ${activeClass} ${letterClass}`}>
      {boxContent}
    </div>
  )
}
LetterBox.propTypes = {
  isBoxActive: PropTypes.bool,
  letterClass: PropTypes.string,
  boxContent: PropTypes.string.isRequired,
 
};
export default LetterBox
