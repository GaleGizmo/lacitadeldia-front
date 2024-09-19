import { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import "./showPhrase.css";
import { getPhraseByNumber } from "../../shared/api";
import { useSelector } from "react-redux";
import isLetter from "../../customhooks/isLetter";
import PhraseDetails from "../PhraseDetails/PhraseDetails";
import GenericMoviePoster from "../../assets/GenericMoviePoster"; // Importa la imagen genérica

const ShowPhrase = ({ displayPhraseLink, showModal, onModalClose }) => {
  const [phraseToWords, setPhraseToWords] = useState([]);
  const [animatedLetters, setAnimatedLetters] = useState({});
  const [phraseDetails, setPhraseDetails] = useState(null);

  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [retryAttempted, setRetryAttempted] = useState(false); // Nuevo estado para rastrear si ya se ha intentado recargar la imagen
  

  // Obtener la frase y las nuevas letras desde el store
  const { phrase, newLetters } = useSelector((state) => state.gameReducer);

  //Muestra secuencialmente las nuevas letras descubiertas
  useEffect(() => {
    const animateLetters = async () => {
      if (phrase && newLetters) {
        const newAnimatedLetters = {};

        let currentGlobalIndex = 0;

        // Ocultar inicialmente las letras nuevas
        phrase.split(" ").forEach((word) => {
          word.split("").forEach((char) => {
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

  // Carga los detalles de la frase cuando se ha acertado
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



  const handleCloseModal = () => {
    onModalClose();
    
  };

  const handleImageError = () => {
    if (!retryAttempted) {
      // Si no se ha intentado recargar, intentar una vez más
      setRetryAttempted(true);
      setImageSrc(`${phraseDetails.poster}?retry=${new Date().getTime()}`);
    } else {
      // Si ya se intentó recargar, mostrar la imagen genérica
      setImageError(true);
    }
  };

  return (
    <div className="showPhrase-container">
      <div className="phrase-container">
        {phraseToWords.map((word, wordIndex) => (
          <span key={wordIndex} className="word">
            {word.split("").map((char, charIndex) => {
              const globalIndex =
                phraseToWords
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
                      ? `in-phrase ${
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

      {/* Mostrar los detalles de la frase en un modal */}
      <PhraseDetails show={showModal} onClose={handleCloseModal}>
        {phraseDetails && (
          <div className="phrase-details">
            <div className="poster-container">
              {imageError ? (
                <GenericMoviePoster width={300} height={450} />
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
              <p className="fade-in delay-1">
                <span className="field-title">Película: </span>
                <span className="field-content">
                  {phraseDetails.movie} ({phraseDetails.year})
                </span>
              </p>
              <p className="fade-in delay-2">
                <span className="field-title">Dirección: </span>
                <span className="field-content">{phraseDetails.director}</span>
              </p>
              <p className="fade-in delay-3">
                <span className="field-title">Cita: </span>
                <span className="field-content">{phraseDetails.quote}</span>
              </p>
              {phraseDetails.original && (
                <p className="fade-in delay-4">
                  <span className="field-title">Original: </span>
                  <span className="field-content">
                    {phraseDetails.original}
                  </span>
                </p>
              )}
              <p className="fade-in delay-5">
                <span className="field-title">Personaje: </span>
                <span className="field-content">
                  {phraseDetails.who_said_it.character} (
                  {phraseDetails.who_said_it.actor})
                </span>
              </p>
              <p className="fade-in delay-6">
                <span className="field-content">
                  {phraseDetails.who_said_it.context}
                </span>
              </p>
            </div>
          </div>
        )}
      </PhraseDetails>
    </div>
  );
};
ShowPhrase.propTypes = {
  displayPhraseLink: PropTypes.bool,
  showModal: PropTypes.bool,
  onModalClose: PropTypes.func.isRequired,
};
export default ShowPhrase;
