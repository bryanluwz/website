import React from "react";
import { Box, Stack } from "@mui/material";
import { Route, Routes, useLocation } from "react-router-dom";

import { useNavigationStore } from "../redux/features/Navigation/hooks";

import MainPage from "./MainPage";
import ErrorPage from "./ErrorPage";
import WIPPage from "./WIPPage";
import AboutPage from "./AboutPage";

import { NavigationBar } from "../components/NavigationBar";
import { Footer } from "../components/Footer";
import { PagesEnum } from "../apis/enums";
import * as styles from "./style.scss";

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
  const { setCurrentRoute } = useNavigationStore();

  React.useEffect(() => {
    const normalizedPath = location.pathname.startsWith("/")
      ? location.pathname.slice(1)
      : location.pathname;
    setCurrentRoute(normalizedPath as PagesEnum);
  }, []);

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <Stack direction={"column"} className={styles.mainContainer} spacing={2}>
      <NavigationBar />
      <Box sx={{ flexGrow: 1 }}>
        <ScrollToTopBeforeRender>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/funsies" element={<WIPPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </ScrollToTopBeforeRender>
      </Box>
      <Footer />
    </Stack>
  );
};

export default App;
