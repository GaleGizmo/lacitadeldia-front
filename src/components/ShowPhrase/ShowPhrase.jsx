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
    const animateLetters = async () => {
      if (phrase && newLetters) {
        const newAnimatedLetters = {};
  
        let currentGlobalIndex = 0;
  
        // Ocultar inicialmente las letras nuevas
        phrase.split(' ').forEach((word) => {
          word.split('').forEach((char) => {
            if (newLetters.includes(char) && char !== "_") {
              newAnimatedLetters[currentGlobalIndex] = false;
            }
            currentGlobalIndex++;
          });
          currentGlobalIndex++; // Contar el espacio entre palabras
        });
  
        // Actualizar `phraseToWords` para renderizado
        setPhraseToWords(phrase.split(" "));
  
        // Revelar y animar letras secuencialmente
        for (let i = 0; i < Object.keys(newAnimatedLetters).length; i++) {
          const index = Object.keys(newAnimatedLetters)[i];
          await new Promise((resolve) => setTimeout(resolve, 300)); // Tiempo constante entre animaciones
  
          setAnimatedLetters((prev) => ({
            ...prev,
            [index]: true,
          }));
        }
  
      }
    };
  
    animateLetters();
  }, [phrase, newLetters]);
  
  

  
  
 //Carga los detalles de la frase cuando se ha acertado
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
//Carga el póster incluyendo tres intentos si hay error con la url de la imagen
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

  //Muestra los campos de la info de la frase de modo secuencial
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

                const displayChar =
              animatedLetters[globalIndex] || !newLetters.includes(char)
                ? char
                : "_";

            return (
              <span
                key={`${wordIndex}-${charIndex}`}
                className={`phrase-letter ${
                  displayChar === "_"
                    ? "letter-box"
                    : isLetter(displayChar)
                    ? `visible-letter ${
                        animatedLetters[globalIndex] ? "animate-reveal" : ""
                      }`
                    : "visible-char"
                }`}
              >
                {displayChar}
              </span>
              );
            })}
            <span className="space">&nbsp;</span>
          </span>
        ))}
      </div>
      {/* Mostrar el botón "Ver detalles de la cita" solo si displayPhraseLink es verdadero */}
      {displayPhraseLink && (
        <div className="phrase-link-container">
          <button className="phrase-link" onClick={handleOpenModal}>
            Ver detalles de la cita
          </button>
        </div>
      )}
      {/* Mostrar los detalles de la frase en un modal */}
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
