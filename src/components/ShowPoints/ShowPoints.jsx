import "./ShowPoints.css";
import { useEffect, useState } from "react";
import { getUserPoints } from "../../shared/api";
import { useSelector } from "react-redux";

const ShowPoints = () => {
  const userId = localStorage.getItem("laCitaDelDiaUserId");
  const [userPoints, setUserPoints] = useState(0);
  const { clues } = useSelector((state) => state.gameReducer);
  useEffect(() => {
    let isMounted = true; // Variable de bandera para rastrear si el componente está montado

    const fetchUserPoints = async () => {
      try {
        if (userId) {
          const data = await getUserPoints(userId);
          if (isMounted) {
            // Solo actualiza el estado si el componente está montado
            setUserPoints(data.points);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserPoints();

    return () => {
      isMounted = false; // Actualiza la bandera cuando el componente se desmonta
    };
  }, [userId, clues]);
  return (
    <div>
      
        <p>
          Puntos: {userPoints && (<span className="points">{userPoints}</span>)}
        </p>
      
    </div>
  );
};

export default ShowPoints;
