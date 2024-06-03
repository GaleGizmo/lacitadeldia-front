
import PropTypes from "prop-types";
import "./phraseDetails.css";

const PhraseDetails = ({ show, onClose, children }) => {
    if (!show) {
      return null;
    }
  
    return (
      <div className="modal-backdrop">
        <div className="modal-content">
          <button className="close-button" onClick={onClose}>X</button>
          {children}
        </div>
      </div>
    );
  };
  
  PhraseDetails.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node
  };
  
  export default PhraseDetails;
