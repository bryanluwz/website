import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import * as mainStyles from "../style.scss";
import { FadeWrapper } from "../../components/FadeWrapper";

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
        <FadeWrapper>
          <Typography variant={"h1"} className={mainStyles.pageTitle}>
            {t("404-title")}
          </Typography>
        </FadeWrapper>
        <FadeWrapper delay={0.3}>
          <Typography variant="h2">{t("404-text")}</Typography>
        </FadeWrapper>
      </Box>
    </Stack>
  );
};

export default ErrorPage;
