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
import CookieConsent from "react-cookie-consent";

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
        <Route path="/" element={<Maintenance />} />
        {/* <Route path="/oldgames" element={<OldGames />} />
        <Route path="/game" element={<GameComponent />} /> */}
        <Route path="/youshouldntbehere" element={<AddPhraseForm />} />
        <Route path="/info" element={<RulesPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>{" "}
      <CookieConsent
        location="bottom"
        buttonText="Aceptar"
        cookieName="lacitadeldiaCookieConsent"
        style={{ background: "#333", color: "#fff" }}
        buttonStyle={{ background: "#007DBB", color: "#fff", fontSize: "14px" }}
       
      >
        Utilizamos cookies estrictamente necesarias para el funcionamiento básico del sitio web. No usamos cookies de seguimiento ni recopilamos datos personales. Para más información, consulta nuestra{" "}
        <a href="/privacy-policy"  target="_blank" rel="noopener noreferrer" style={{ color: "#fff", textDecoration: "underline" }}>
          Política de Privacidad
        </a>.
      </CookieConsent>
      {!dontShowInstructions && <NewUserBanner onClose={handleCloseBanner} />}
    </div>
  );
}

export default App;
