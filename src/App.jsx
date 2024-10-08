/* eslint-disable react-hooks/exhaustive-deps */
import { Route, Routes, useLocation } from "react-router-dom";
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
import NotFound from "./components/NotFound/NotFound";
import ContactForm from "./pages/Contact/Contact";
import Cookies from "js-cookie";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  const validRoutes = [
    "/",
    "/oldgames",
    "/game",
    "/youshouldntbehere",
    "/info",
    "/privacy-policy",
    "/contact",
  ];

  const { dontShowInstructions } = useSelector((state) => state.userReducer);

  useEffect(() => {
    const getUserData = async () => {
      const userId =  Cookies.get("laCitaDelDiaUserId") || localStorage.getItem("laCitaDelDiaUserId") ;
      
      if (userId) {
        try {
           dispatch(getUser(userId))
        } catch (error) {
          // Si hay un error al obtener el usuario (por ejemplo, no existe), creamos uno nuevo
          console.error("Error al obtener usuario, creando uno nuevo:", error);
          Cookies.remove("laCitaDelDiaUserId");
          localStorage.removeItem("laCitaDelDiaUserId");
          await createNewUser();
        }
      } else {
        await createNewUser();
      }
    };
  
    const createNewUser = async () => {
      try {
         dispatch(createUser())
      } catch (error) {
        console.error("Error al crear nuevo usuario:", error);
       
      }
    };
  
    getUserData();
  }, [dispatch]);

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
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {validRoutes.includes(location.pathname) && !dontShowInstructions && (
        <NewUserBanner onClose={handleCloseBanner} />
      )}

      <CookieConsent
        location="bottom"
        buttonText="Aceptar"
        cookieName="lacitadeldiaCookieConsent"
        style={{ background: "#333", color: "#fff" }}
        buttonStyle={{ background: "#007DBB", color: "#fff", fontSize: "14px" }}
      >
        Utilizamos cookies estrictamente necesarias para el funcionamiento
        básico del sitio web. No usamos cookies de seguimiento ni recopilamos
        datos personales. Para más información, consulta nuestra{" "}
        <a
          href="/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#fff", textDecoration: "underline" }}
        >
          Política de Privacidad
        </a>
        .
      </CookieConsent>
    </div>
  );
}

export default App;
