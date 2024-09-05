
import { PropTypes } from "prop-types";
const GenericMoviePoster = ({ width = 200, height = 300, text = "Póster no disponible" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 300"
      width={width}
      height={height}
      className="generic-movie-poster"
    >
      <rect width="200" height="300" fill="#e0e0e0" />
      <rect x="20" y="20" width="160" height="200" fill="#c0c0c0" />
      <circle cx="100" cy="120" r="50" fill="#a0a0a0" />
      <rect x="40" y="240" width="120" height="20" fill="#a0a0a0" />
      <rect x="40" y="270" width="80" height="10" fill="#a0a0a0" />
      
      <text
        x="100"
        y="200"
        fontFamily="Arial, sans-serif"
        fontSize="14"
        textAnchor="middle"
        fill="#505050"
      >
        {text}
      </text>
    </svg>
  );
};
GenericMoviePoster.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    text: PropTypes.string,
  };
  
export default GenericMoviePoster;