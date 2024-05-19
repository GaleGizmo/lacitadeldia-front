
import PropTypes from "prop-types";
import "./letterBox.css"

function LetterBox({isBoxActive, boxContent, isLetterInPhrase}) {
  const isActive = isBoxActive ? "active" : "";
  const isInPhrase = isLetterInPhrase ? "in-phrase" : "";
  
  return (
    <div className={`letter ${isActive} ${isInPhrase}`}>
      {boxContent}
    </div>
  )
}
LetterBox.propTypes = {
  isBoxActive: PropTypes.bool.isRequired,
  boxContent: PropTypes.string.isRequired,
  isLetterInPhrase: PropTypes.bool.isRequired
};
export default LetterBox
