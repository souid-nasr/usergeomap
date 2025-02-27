import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./App";
import { SnackbarProvider } from "notistack";

import "leaflet/dist/leaflet.css";
import { createRoot } from "react-dom/client"; // Importation de createRoot
const container = document.getElementById("root")!;
const root = createRoot(container); // Utilisation de createRoot

root.render(
  <Provider store={store}>
    <SnackbarProvider maxSnack={3}>
      <App />
    </SnackbarProvider>
  </Provider>
);
