import React from "react";
import { Box, Stack } from "@mui/material";
import { Route, Routes, useLocation } from "react-router-dom";
import cx from "classnames";

import { useNavigationStore } from "../redux/features/Navigation/hooks";

import MainPage from "./MainPage";
import ErrorPage from "./ErrorPage";
import WIPPage from "./WIPPage";
import AboutPage from "./AboutPage";

import { NavigationBar } from "../components/NavigationBar";
import { Footer } from "../components/Footer";
import { PagesEnum } from "../apis/enums";
import * as styles from "./style.scss";
import ChatbotComponent from "../components/ChatbotComponent";
import { getCookie } from "../utils";
import { FunsiesPage } from "./FunsiesPage";

const ScrollToTopBeforeRender = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const location = useLocation();

  React.useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" }); // Ensure instant scrolling
  }, [location.pathname]);

  return <>{children}</>;
};

export const App = () => {
  const location = useLocation();
  const { setCurrentRoute, isChatbotOpen, setDarkMode } = useNavigationStore();

  React.useEffect(() => {
    const normalizedPath = location.pathname.startsWith("/")
      ? location.pathname.slice(1)
      : location.pathname;
    setCurrentRoute(normalizedPath as PagesEnum);
  }, []);

  React.useEffect(() => {
    const cookieVal = getCookie("darkMode");

    if (cookieVal === "true") {
      document.documentElement.setAttribute("data-theme", "dark");
      setDarkMode(true);
    } else if (cookieVal === "false") {
      document.documentElement.setAttribute("data-theme", "light");
      setDarkMode(false);
    } else {
      // fallback to system
      const prefersDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      document.documentElement.setAttribute(
        "data-theme",
        prefersDarkMode ? "dark" : "light"
      );
      setDarkMode(prefersDarkMode);
    }
  }, []);

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <>
      <Stack direction={"column"} className={styles.mainContainer} spacing={2}>
        <NavigationBar />
        <Box sx={{ flexGrow: 1 }}>
          <ScrollToTopBeforeRender>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/funsies" element={<FunsiesPage />} />
              <Route
                path="*"
                element={
                  <React.Suspense fallback={<WIPPage />}>
                    <ErrorPage />
                  </React.Suspense>
                }
              />
            </Routes>
          </ScrollToTopBeforeRender>
        </Box>
        <Footer />
      </Stack>
      {/* This would be anchored at the bottom right of the page */}
      <Box
        className={cx(styles.chatbotContainer, {
          [styles.hidden]: !isChatbotOpen,
        })}
      >
        <ChatbotComponent isOpen={isChatbotOpen} />
      </Box>
    </>
  );
};

export default App;
