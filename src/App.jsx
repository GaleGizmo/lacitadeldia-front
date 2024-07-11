import { Route, Routes } from "react-router-dom";
import "./App.css";
import GameComponent from "./components/GameComponent/GameComponent";
import AddPhraseForm from "./components/AddPhraseForm/AddPhraseForm";
import Header from "./components/Header/Header";
import OldGames from "./pages/oldGames/OldGames";
import RulesPage from "./pages/RulesPage/RulesPage";


function App() {
  return (
    <div className="home">
      <Header />
      
      <Routes>
        <Route path="/" element={<GameComponent />} />
        <Route path="/oldgames" element={<OldGames />} />
        <Route path="/game" element={<GameComponent />} />
        <Route path="/youshouldntbehere" element={<AddPhraseForm />} />
        <Route path="/info" element={<RulesPage />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>{" "}
    </div>
  );
}

export default App;
