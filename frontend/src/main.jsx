import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.js";
import { SocketContextProvider } from "./context/SocketContext.jsx";
import { PersistGate } from "redux-persist/integration/react";
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <SocketContextProvider>
        <Toaster position="bottom-right" />
        <App />
      </SocketContextProvider>
    </PersistGate>
  </Provider>
);
