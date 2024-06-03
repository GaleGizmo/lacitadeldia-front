import { Route, Routes } from "react-router-dom";
import "./App.css";
import GameComponent from "./components/GameComponent/GameComponent";
import AddPhraseForm from "./components/AddPhraseForm/AddPhraseForm";

function App() {
  return (
    <div className="home">
      <Routes>
        <Route path="/" element={<GameComponent />} />
        <Route path="/game" element={<GameComponent />} />
        <Route path="/youshouldntbehere" element={<AddPhraseForm/>}/>
      </Routes>
    </div>
  );
}

export default App;
