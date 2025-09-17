import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { QueryProvider } from "./app/providers/QueryProvider";
import App from "./App";
import "./index.css";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryProvider>
        <MantineProvider>
          <App />
        </MantineProvider>
      </QueryProvider>
    </Provider>
  </React.StrictMode>
);
