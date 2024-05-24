import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {startGame } from "../../redux/game/game.actions";
import TryWord from "../TryWord/TryWord";
import Keyboard from "../Keyboard/Keyboard";
import ShowPhrase from "../ShowPhrase/ShowPhrase";

import getOrCreateUUId from "../../customhooks/uuid";



const GameComponent = () => {
  const dispatch = useDispatch();
  const userId = getOrCreateUUId(); // Obtener el UUID del usuario
  const [wordsToTry, setWordsToTry] = useState([]);
  
 
  const  game = useSelector((state) => state.gameReducer);
  useEffect(() => {
   
    dispatch(startGame(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    const words = [];
    for (let i = 0; i < game.maximumTries; i++) {
      words.push(<TryWord key={i} index={i} />);
    }
    setWordsToTry(words);
  }, [game.triedWords, game.maximumTries]);
  
  if (game.loading) {
    return <div>Loading...</div>;
  }

  if (game.error) {
    return <div>Error: {game.error}</div>;
  }

  

 

  return (
    <div className="game">
     {wordsToTry}
      <ShowPhrase />
      <Keyboard userId={userId} /> {/* Pasar el userId al teclado */}
    </div>
  );
};

export default GameComponent;
