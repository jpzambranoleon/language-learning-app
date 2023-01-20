import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { InfoProvider } from "./utils/InfoProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <InfoProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </InfoProvider>
  </React.StrictMode>
);
