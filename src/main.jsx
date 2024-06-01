
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from "react-redux";
import store from './redux/store.js'
import './index.css'
import { Toaster } from 'sonner';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <Toaster position="top-center" duration={2000} />
    <App />
  </Provider>,
)
