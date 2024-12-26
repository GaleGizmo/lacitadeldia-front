/* eslint-disable react/prop-types */

import "./UserStats.css";


const UserStats = ({percentages, playing, notPlayed}) => {
 
  
  
  return (
    <div className="user-stats">
      <h2>ESTADÍSTICAS</h2>
      {percentages && (
        <div className="stats-container">
          <p className="stats-data">
            <span className="win-txt">{percentages.win}</span>
          </p>
          <p className="stats-data">
            <span className="lose-txt">{percentages.lose}</span>
          </p>
         
          <p className="stats-data">
            <span className="np-txt">
              {notPlayed}
            </span>
           
          </p>
          <p className="stats-data">
            <span className="playing-txt">{playing}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default UserStats;
