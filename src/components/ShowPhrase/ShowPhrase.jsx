/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./showPhrase.css";
import { getPhraseByNumber } from "../../shared/api";
import { useSelector } from "react-redux";
import isLetter from "../../customhooks/isLetter";
import PhraseDetails from "../PhraseDetails/PhraseDetails";

const MAX_RETRY_ATTEMPTS = 3;

const ShowPhrase = ({ displayPhraseLink }) => {
  const [phraseToWords, setPhraseToWords] = useState([]);
  const [animatedLetters, setAnimatedLetters] = useState({});
  const [phraseDetails, setPhraseDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const [visibleFields, setVisibleFields] = useState(0);

  // Obtener la frase y las nuevas letras desde el store
  const { phrase, newLetters } = useSelector((state) => state.gameReducer);

  useEffect(() => {
    if (phrase && newLetters) {
      const newAnimatedLetters = {};

      let currentGlobalIndex = 0;

      phrase.split(' ').forEach((word, wordIndex) => {
        word.split('').forEach((char, charIndex) => {
          if (newLetters.includes(char) && char !== "_") {
            newAnimatedLetters[currentGlobalIndex] = true;
          }
          currentGlobalIndex++;
        });
        // Incrementa para contar el espacio entre las palabras
        currentGlobalIndex++;
      });

      setPhraseToWords(phrase.split(" "));
      setAnimatedLetters(newAnimatedLetters);

      // Reset animation after a delay
      const timer = setTimeout(() => {
        setAnimatedLetters({});
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [phrase, newLetters]);

  useEffect(() => {
    const fetchPhrase = async () => {
      try {
        if (displayPhraseLink) {
          const phraseNumber = localStorage.getItem("phraseNumber");
          let fetchedPhrase = await getPhraseByNumber(phraseNumber);

          setPhraseDetails(fetchedPhrase);
          setImageSrc(fetchedPhrase.poster);
        }
      } catch (error) {
        console.error("Error fetching phrase:", error);
      }
    };

    fetchPhrase();
  }, [displayPhraseLink]);

  useEffect(() => {
    if (imageError && retryCount < MAX_RETRY_ATTEMPTS) {
      const retryTimeout = setTimeout(() => {
        setImageError(false);
        setImageSrc(`${phraseDetails.poster}?retry=${new Date().getTime()}`);
        setRetryCount(retryCount + 1);
      }, 1000);

      return () => clearTimeout(retryTimeout);
    }
  }, [imageError, retryCount, phraseDetails]);

  useEffect(() => {
    if (showModal && visibleFields < 6) {
      const timer = setTimeout(() => {
        setVisibleFields((prev) => prev + 1);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [showModal, visibleFields]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setVisibleFields(0);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="showPhrase-container">
      <div className="phrase-container">
        {phraseToWords.map((word, wordIndex) => (
          <span key={wordIndex} className="word">
            {word.split("").map((char, charIndex) => {
              const globalIndex = phraseToWords
                .slice(0, wordIndex)
                .reduce((acc, w) => acc + w.length + 1, 0) + charIndex;

              return (
                <span
                  key={`${wordIndex}-${charIndex}`}
                  className={`phrase-letter ${
                    char === "_"
                      ? "letter-box"
                      : isLetter(char)
                      ? `visible-letter ${animatedLetters[globalIndex] ? "animate-reveal" : ""}`
                      : "visible-char"
                  }`}
                >
                  {char}
                </span>
              );
            })}
            <span className="space">&nbsp;</span>
          </span>
        ))}
      </div>
      {displayPhraseLink && (
        <div className="phrase-link-container">
          <button className="phrase-link" onClick={handleOpenModal}>
            Ver detalles de la cita
          </button>
        </div>
      )}
      <PhraseDetails show={showModal} onClose={handleCloseModal}>
        {phraseDetails && (
          <div className="phrase-details">
            <div className="poster-container">
              {imageError ? (
                <div className="image-error">Imagen no disponible</div>
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
              {visibleFields > 0 && (
                <p className="fade-in">
                  <span className="field-title">Película:</span>{" "}
                  <span className="field-content">
                    {phraseDetails.movie} ({phraseDetails.year})
                  </span>
                </p>
              )}
              {visibleFields > 1 && (
                <p className="fade-in">
                  <span className="field-title">Director:</span>{" "}
                  <span className="field-content">
                    {phraseDetails.director}
                  </span>
                </p>
              )}
              {visibleFields > 2 && (
                <p className="fade-in">
                  <span className="field-title">Frase:</span>{" "}
                  <span className="field-content">{phraseDetails.quote}</span>
                </p>
              )}
              {visibleFields > 3 && phraseDetails.original && (
                <p className="fade-in">
                  <span className="field-title">Original:</span>{" "}
                  <span className="field-content">
                    {phraseDetails.original}
                  </span>
                </p>
              )}
              {visibleFields > 4 && (
                <p className="fade-in">
                  <span className="field-title">Personaje:</span>{" "}
                  <span className="field-content">
                    {phraseDetails.who_said_it.character} (
                    {phraseDetails.who_said_it.actor})
                  </span>
                </p>
              )}

              {visibleFields > 5 && (
                <p className="fade-in">
                  <span className="field-content">
                    {phraseDetails.who_said_it.context}
                  </span>
                </p>
              )}
            </div>
          </div>
        )}
      </PhraseDetails>
    </div>
  );
};

export default ShowPhrase;
