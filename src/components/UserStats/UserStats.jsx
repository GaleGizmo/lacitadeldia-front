/* eslint-disable react/prop-types */

import "./UserStats.css";


const UserStats = ({percentages, playing, notPlayed}) => {
 
  
  
  return (
    <div className="user-stats">
      <h2>ESTADÍSTICAS</h2>
      {percentages && (
        <div className="stats-container">
          <p className="stats-data">
            <span>{percentages.win}</span>GANADAS{" "}
          </p>
          <p className="stats-data">
            <span>{percentages.lose}</span>PERDIDAS{" "}
          </p>
          <p className="stats-data">
            <span>{playing}</span>JUGANDO
          </p>
          <p className="stats-data">
            <span>
              {notPlayed}
            </span>
            NO JUGADA
          </p>
        </div>
      )}
    </div>
  );
};

export default UserStats;
