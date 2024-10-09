/* eslint-disable react/prop-types */
import "./ShareButton.css"
import WhatsappIcon from "../../assets/Whatsapp";
import TelegramIcon from "../../assets/TelegramIcon";
import TwitterIcon from "../../assets/TwitterIcon";


const ShareButton = ({ gameStatus, phraseNumber, attempts, maxTries, points }) => {
  const shareResult = (platform) => {
    const gameUrl='https://www.lacitadeldia.com'
    const emoji = gameStatus === 'win' ? '🎉' : '😔';
    const attemptsText = gameStatus === 'win' ? `en ${attempts}/${maxTries} intentos` : 'pero sin suerte';
    const resultMessage = gameStatus === 'win' ? 'Descubrí la cita' : 'Intenté la cita';
    const message = `${resultMessage} #${phraseNumber} ${attemptsText} ${emoji} ¡Tengo ${points} puntos!\n ¡Juega tú también en ${gameUrl}!`;
    const encodedMessage = encodeURIComponent(message);

    if (platform === 'whatsapp') {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        window.location.href = `whatsapp://send?text=${encodedMessage}`;
      } else {
        window.open(`https://web.whatsapp.com/send?text=${encodedMessage}`, '_blank');
      }
    } else if (platform === 'telegram') {
      window.open(`https://t.me/share/url?url=https://guessthequote.vercel.app/&text=${encodedMessage}`, '_blank');
    } else if (platform === 'x') {
      window.open(`https://twitter.com/intent/tweet?text=${encodedMessage}`, '_blank');
    }
  };

  return (
    <div className="share-buttons-container">
      <div onClick={() => shareResult('whatsapp')} className="share-button">
        <WhatsappIcon />
      </div>
      <div onClick={() => shareResult('telegram')} className="share-button">
      <TelegramIcon/>
      </div>
      <div onClick={() => shareResult('x')} className="share-button">
      <TwitterIcon />
      </div>
    </div>
  );
};

export default ShareButton;