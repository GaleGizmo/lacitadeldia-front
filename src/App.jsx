/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import { getPhraseOfTheDay, setMaximumTries } from "./redux/game/game.actions";
import TryWord from "./components/TryWord/TryWord";
import Keyboard from "./components/Keyboard/Keyboard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import countDistinctConsonants from "./customhooks/countConsonants";
import { useDispatch } from 'react-redux';
import ShowPhrase from "./components/ShowPhrase/ShowPhrase";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // Fetch the phrase of the day when the component mounts
    dispatch(getPhraseOfTheDay())
  }, [dispatch]);

  const {phrase, triedWords,  maximumTries}=useSelector((state)=>state.gameReducer)
 
  const [wordsToTry, setWordsToTry] = useState([]);

  //fija el máximo de intentos y muestra los intentos
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
    <div className="home">
      {wordsToTry}
      <ShowPhrase/>
      <Keyboard />
    </div>
  );
}

export default App;
