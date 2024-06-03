import React from 'react';
import PropTypes from 'prop-types';
import './keyboardRow.css';

function KeyboardRow({ letters, handleClick, isGameOver, phrase }) {
  return (
    <div className="keys">
      {letters.map((letter) => (
        <div
          key={letter}
          onClick={() => !isGameOver && handleClick(letter)}
          className={`key ${phrase && phrase.includes(letter) ? 'in-phrase' : ''}`}
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
  isGameOver: PropTypes.string.isRequired,
  phrase: PropTypes.string,
};

export default React.memo(KeyboardRow);
