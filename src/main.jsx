import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")).render(
  
  <Provider store={store}>
  
    <BrowserRouter>
  
      <App />
      <Toaster
        position="top-center"
        toastOptions={{
         
        }}
        duration={2000}
      />
    </BrowserRouter>
   

  </Provider>
  
);
