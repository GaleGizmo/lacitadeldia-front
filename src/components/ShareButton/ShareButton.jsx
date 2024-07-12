/* eslint-disable react/prop-types */
import "./ShareButton.css"
import WhatsappIcon from "../../assets/Whatsapp";


const ShareButton = ({ gameResult, phraseNumber, attempts }) => {
  const shareResult = () => {
    const emoji = gameResult === 'win' ? '🎉' : '😔';
    const attemptsText = gameResult === 'win' ? `en ${attempts} intentos` : 'pero sin suerte';
    const message = `Jugué la frase #${phraseNumber} ${attemptsText} ${emoji}\n¡Juega tú también en https://guessthequote.vercel.app/!`;
    
      // Detectar si es un dispositivo móvil
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      if (isMobile) {
        // Usar el esquema whatsapp:// para dispositivos móviles
        window.location.href = `whatsapp://send?text=${encodeURIComponent(message)}`;
      } else {
        // Usar la URL web para PC
        window.open(`https://web.whatsapp.com/send?text=${encodeURIComponent(message)}`, '_blank');
      }
  };

  return (
    <div onClick={shareResult} className="share-button">
      <WhatsappIcon/>
    </div>
  );
};

export default ShareButton;