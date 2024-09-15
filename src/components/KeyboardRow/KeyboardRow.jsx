import React from "react";
import PropTypes from "prop-types";
import "./keyboardRow.css";

function KeyboardRow({
  letters,
  handleClick,
  gameStatus,
  lettersFound,
  lettersFailed,
}) {

  return (
    <div className="keys">
      {letters.map((letter) => (
        <div
          key={letter}
          onClick={() => gameStatus==="playing" && handleClick(letter)}
          className={`key ${
            lettersFound && lettersFound.includes(letter) ? "in-phrase" : lettersFailed && lettersFailed.includes(letter) ? "not-in-phrase":""
          }`}
        >
          {letter}
        </div>
      ))}
    </div>
  );
}

KeyboardRow.propTypes = {
  letters: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleClick: PropTypes.func.isRequired,
  gameStatus: PropTypes.string.isRequired,
  lettersFailed: PropTypes.arrayOf(PropTypes.string),
  lettersFound: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default React.memo(KeyboardRow);
