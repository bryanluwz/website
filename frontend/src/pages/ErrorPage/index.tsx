import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { NavigationBar } from "../../components/NavigationBar";
import * as mainStyles from "../style.scss";

export const ErrorPage: React.FC = () => {
  return (
    <Stack direction={"column"} spacing={2}>
      <Box>
        <Stack direction={"column"}>
          <Typography variant={"h1"}>Oopsies</Typography>
          <Typography variant="h2">Are you at the right page?</Typography>
        </Stack>
      </Box>
      <Box>
        <Stack></Stack>
      </Box>
    </Stack>
  );
};

export default ErrorPage;
