/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

import "./showPhrase.css";
import { getPhraseOfTheDay, updateGame } from "../../shared/api";
import { useDispatch } from "react-redux";
import { gameOver, updatePhrase } from "../../redux/game/game.actions";
import processPhraseToShow from "../../customhooks/hideLetters";

import isLetter from "../../customhooks/isLetter";
import PhraseDetails from "../PhraseDetails/PhraseDetails";

const ShowPhrase = ({ triedWords, displayPhraseLink }) => {
  const dispatch = useDispatch();
  const [phraseToWords, setPhraseToWords] = useState([]);
  const [phraseDetails, setPhraseDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchPhrase = async () => {
      try {
        const fetchedPhrase = await getPhraseOfTheDay();
        setPhraseDetails(fetchedPhrase);

        const processPhrase = processPhraseToShow(
          fetchedPhrase.quote,
          triedWords
        );
        dispatch(updatePhrase(processPhrase));

        setPhraseToWords(processPhrase.split(" "));
      } catch (error) {
        console.error("Error fetching phrase:", error);
      }
    };

    fetchPhrase();
  }, [triedWords]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="showPhrase-container">
      <div className="phrase-container">
        {phraseToWords.map((word, wordIndex) => (
          <span key={wordIndex} className="word">
            {word.split("").map((char, charIndex) => (
              <span
                key={charIndex}
                className={`phrase-letter ${
                  char === "_"
                    ? "letter-box"
                    : isLetter(char)
                    ? "visible-letter"
                    : "visible-char"
                }`}
              >
                {char}
              </span>
            ))}
            <span className="space">&nbsp;</span>
          </span>
        ))}
      </div>{" "}
      {displayPhraseLink && (
        <div className="phrase-link-container">
          <button className="phrase-link" onClick={handleOpenModal}>
            Ver detalles de la frase
          </button>
        </div>
      )}
      <PhraseDetails show={showModal} onClose={handleCloseModal}>
        {phraseDetails && (
          <div className="phrase-details">
            <div className="poster-container">
              <img
                src={phraseDetails.poster}
                alt="Póster"
                className="poster-image"
              />
            </div>
            <div className="details-container">
              <h2>Detalles de la Frase</h2>
              <p>
                <strong>Película:</strong> {phraseDetails.movie}
              </p>
              <p>
                <strong>Frase:</strong> {phraseDetails.quote}
              </p>
              <p>
                <strong>Original:</strong> {phraseDetails.original}
              </p>
              
              <p>
                <strong>Año:</strong> {phraseDetails.year}
              </p>
              <p>
                <strong>Actor:</strong> {phraseDetails.who_said_it.actor}
              </p>
              <p>
                <strong>Personaje:</strong>{" "}
                {phraseDetails.who_said_it.character}
              </p>
              <p>
                <strong>Contexto:</strong> {phraseDetails.who_said_it.context}
              </p>
            </div>
          </div>
        )}
      </PhraseDetails>
    </div>
  );
};

export default ShowPhrase;
