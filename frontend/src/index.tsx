import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";

import MainPage from "./pages/MainPage/index";
// import About from "./pages/AboutPage";
// import Play from "./pages/PlayPage";
// import Contact from "./pages/ContactPage";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <HashRouter>
          <Routes>
            <Route path="/*" element={<MainPage />} />
            {/* <Route path="/about" element={<About />} />
          <Route path="/play" element={<Play />} />
          <Route path="/contact" element={<Contact />} /> */}
          </Routes>
        </HashRouter>
      </ThemeProvider>
    </Provider>
  );
}
