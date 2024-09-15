/* eslint-disable react-hooks/exhaustive-deps */
import { Route, Routes } from "react-router-dom";
import "./App.css";
import GameComponent from "./components/GameComponent/GameComponent";
import AddPhraseForm from "./components/AddPhraseForm/AddPhraseForm";
import Header from "./components/Header/Header";
import OldGames from "./pages/oldGames/OldGames";
import RulesPage from "./pages/RulesPage/RulesPage";
import { useDispatch, useSelector } from "react-redux";
import {
  closeInstructionsBanner,
  createUser,
  getUser,
} from "./redux/user/user.actions";
import { useEffect } from "react";
import NewUserBanner from "./components/NewUserBanner/NewUSerBanner";
import PrivacyPolicy from "./pages/Privacy/PrivacyPolicy";

function App() {
  const dispatch = useDispatch();

  const { dontShowInstructions } = useSelector((state) => state.userReducer);
  useEffect(() => {
    const userId = localStorage.getItem("laCitaDelDiaUserId");
    if (!userId) {
      dispatch(createUser());
    } else dispatch(getUser(userId));
  }, []);

  const handleCloseBanner = () => {
    dispatch(closeInstructionsBanner());
  };

  return (
    <div className="home">
      <Header />
      <Routes>
        <Route path="/" element={<GameComponent />} />
        <Route path="/oldgames" element={<OldGames />} />
        <Route path="/game" element={<GameComponent />} />
        <Route path="/youshouldntbehere" element={<AddPhraseForm />} />
        <Route path="/info" element={<RulesPage />} />
        <Route path="/privacidad" element={<PrivacyPolicy />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>{" "}
      {!dontShowInstructions && <NewUserBanner onClose={handleCloseBanner} />}
    </div>
  );
}

export default App;
