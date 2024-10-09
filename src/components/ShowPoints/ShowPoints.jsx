import "./ShowPoints.css";
import { useEffect, useState } from "react";
import { getUserPoints } from "../../shared/api";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { setUserPointsAction } from "../../redux/user/user.actions";

const ShowPoints = () => {
  const userId = localStorage.getItem("laCitaDelDiaUserId");
  const [userPoints, setUserPoints] = useState(0);
  const { clues } = useSelector((state) => state.gameReducer);
  const dispatch=useDispatch();

  useEffect(() => {
    let isMounted = true; // Variable de bandera para rastrear si el componente está montado

    const fetchUserPoints = async () => {
      try {
        if (userId) {
          const data = await getUserPoints(userId);
          if (isMounted) {
            // Solo actualiza el estado si el componente está montado
            setUserPoints(data.points);
            dispatch(setUserPointsAction(data.points))
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserPoints();

    return () => {
      isMounted = false; // Actualiza la bandera cuando el componente se desmonta
    };
  }, [userId, clues, dispatch]);
  return (
    <div>
      
        <p>
          Puntos: {userPoints && (<span className="points">{userPoints}</span>)}
        </p>
      
    </div>
  );
};

export default ShowPoints;
