/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

import "./showPhrase.css";
import { getPhraseByNumber, getPhraseOfTheDay } from "../../shared/api";
import { useDispatch } from "react-redux";
import {  updatePhrase } from "../../redux/game/game.actions";
import processPhraseToShow from "../../customhooks/hideLetters";

import isLetter from "../../customhooks/isLetter";
import PhraseDetails from "../PhraseDetails/PhraseDetails";

const MAX_RETRY_ATTEMPTS = 5; // Número máximo de intentos de recarga

const ShowPhrase = ({ triedWords, displayPhraseLink }) => {
  const dispatch = useDispatch();
  const [phraseToWords, setPhraseToWords] = useState([]);
  const [phraseDetails, setPhraseDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [imageError, setImageError] = useState(false); // Estado para manejar el error de la imagen
  const [imageSrc, setImageSrc] = useState(''); // Estado para manejar la fuente de la imagen
  const [retryCount, setRetryCount] = useState(0); // Estado para el número de intentos de recarga

  useEffect(() => {
    const fetchPhrase = async () => {
      try {
        const phraseNumber=localStorage.getItem("phraseNumber");
        const fetchedPhrase = await getPhraseByNumber(phraseNumber);
        setPhraseDetails(fetchedPhrase);
        setImageSrc(fetchedPhrase.poster); // Establecer la fuente de la imagen

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

  useEffect(() => {
    if (imageError && retryCount < MAX_RETRY_ATTEMPTS) {
      const retryTimeout = setTimeout(() => {
        setImageError(false);
        setImageSrc(`${phraseDetails.poster}?retry=${new Date().getTime()}`); // Añadir un parámetro único para evitar el caché
        setRetryCount(retryCount + 1);
      }, 1000); // Esperar 1 segundo antes de intentar recargar la imagen

      return () => clearTimeout(retryTimeout); // Limpiar el timeout si el componente se desmonta
    }
  }, [imageError, retryCount, phraseDetails]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleImageError = () => {
    setImageError(true);
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
              {imageError ? (
                <div className="image-error">
                  Imagen no disponible
                </div>
              ) : (
                <img
                  src={imageSrc}
                  alt="Póster"
                  className="poster-image"
                  onError={handleImageError}
                />
              )}
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
                <strong>Personaje:</strong> {phraseDetails.who_said_it.character}
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
