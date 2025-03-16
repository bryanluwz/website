import React from "react";
import { Box, Stack } from "@mui/material";
import { NavigationBar } from "../../components/NavigationBar";

export const MainPage: React.FC = () => {
  return (
    <Box>
      <Stack
        direction="column"
        justifyContent={"center"}
        alignItems={"center"}
        spacing={2}
      >
        <NavigationBar />
      </Stack>
    </Box>
  );
};

export default MainPage;
