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
import { toast } from "sonner";
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
      const localUserId = localStorage.getItem("laCitaDelDiaUserId");
      const cookieUserId = Cookies.get("laCitaDelDiaUserId");

      let userId = cookieUserId || localUserId;

      if (userId) {
        try {
          await dispatch(getUser(userId));
          // Sincronizar `localStorage` y cookies si están desincronizados
          if (localUserId !== cookieUserId) { syncUserIdStorage(localUserId, cookieUserId);}
        } catch (error) {
          // Sólo eliminar cookies/localStorage si el error es 404 (Usuario no encontrado)
          await handleUserDataError(error);
        }
      } else {
        await createNewUser();
      }
    };
    const syncUserIdStorage = (localUserId, cookieUserId) => {
      if (!localUserId && cookieUserId) {
        localStorage.setItem("laCitaDelDiaUserId", cookieUserId);
      } else if (localUserId && !cookieUserId) {
        Cookies.set("laCitaDelDiaUserId", localUserId);
      }
    };
    const handleUserDataError = async (error) => {
      if (error.response?.status === 404) {
        Cookies.remove("laCitaDelDiaUserId");
        localStorage.removeItem("laCitaDelDiaUserId");
        await createNewUser();
      } else {
        toast.error(
          "Error al obtener datos del usuario. Inténtalo de nuevo más tarde."
        );
        console.error(
          "Error transitorio, intentando nuevamente más tarde:",
          error
        );
      }
    };
    const createNewUser = async () => {
      try {
        await dispatch(createUser());
      } catch (error) {
        console.error("Error al crear nuevo usuario:", error);
        toast.error(
          "Error al crear nuevo usuario. Inténtalo de nuevo más tarde."
        );
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
