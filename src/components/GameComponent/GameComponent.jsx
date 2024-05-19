import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPhraseOfTheDay, setMaximumTries } from "../redux/game/game.actions";
import TryWord from "../components/TryWord/TryWord";
import Keyboard from "../components/Keyboard/Keyboard";
import ShowPhrase from "../components/ShowPhrase/ShowPhrase";
import countDistinctConsonants from "../customhooks/countConsonants";
import getOrCreateUUId from "../customhooks/uuid";



const GameComponent = () => {
  const dispatch = useDispatch();
  const userId = getOrCreateUUId(); // Obtener el UUID del usuario

  useEffect(() => {
    dispatch(getPhraseOfTheDay(userId)); // Pasar el userId al iniciar el juego
  }, [dispatch, userId]);

  const { phrase, triedWords, maximumTries } = useSelector((state) => state.gameReducer);
  const [wordsToTry, setWordsToTry] = useState([]);

  useEffect(() => {
    if (phrase) {
      const distinctConsonants = countDistinctConsonants(phrase);
      const maxTries = Math.ceil(distinctConsonants / 3);
      dispatch(setMaximumTries(maxTries));
    }
  }, [phrase, dispatch]);

  useEffect(() => {
    const words = [];
    for (let i = 0; i < maximumTries; i++) {
      words.push(<TryWord key={i} index={i} />);
    }
    setWordsToTry(words);
  }, [triedWords, maximumTries]);

  return (
    <div className="game">
      {wordsToTry}
      <ShowPhrase />
      <Keyboard userId={userId} /> {/* Pasar el userId al teclado */}
    </div>
  );
};

export default GameComponent;
