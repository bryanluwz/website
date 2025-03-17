import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import * as mainStyles from "../style.scss";

export const ErrorPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Stack
      direction={"column"}
      spacing={"5rem"}
      alignItems={"center"}
      width={"100%"}
    >
      <Box className={mainStyles.pageTitleWrapper}>
        <Typography variant={"h1"} className={mainStyles.pageTitle}>
          {t("404-title")}
        </Typography>
        <Typography variant="h2">{t("404-text")}</Typography>
      </Box>
    </Stack>
  );
};

export default ErrorPage;
