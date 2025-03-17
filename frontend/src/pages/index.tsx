import React from "react";
import { Box, Stack } from "@mui/material";
import { Route, Routes } from "react-router-dom";

import { NavigationBar } from "../components/NavigationBar";
import * as styles from "./style.scss";
import MainPage from "./MainPage";
import ErrorPage from "./ErrorPage";
import { Footer } from "../components/Footer";
import WIPPage from "./WIPPage";

export const App = () => {
  return (
    <Stack direction={"column"} className={styles.mainContainer} spacing={2}>
      <NavigationBar />
      <Box sx={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/about" element={<WIPPage />} />
          <Route path="/funsies" element={<WIPPage />} />
          {/* <Route path="/contact" element={<Contact />} /> */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Box>
      <Footer />
    </Stack>
  );
};

export default App;
