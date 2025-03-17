import React from "react";
import cx from "classnames";
import { useTranslation } from "react-i18next";
import { Box, Grid2, Stack, Typography } from "@mui/material";

import { MainPageCard } from "../../components/MainPageCard";
import PlaceholderImage from "../../../public/assets/default.jpg";
import * as mainStyles from "../style.scss";
import * as styles from "./style.scss";

export const MainPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Stack direction={"column"} spacing={"5rem"} alignItems={"center"}>
      <Box className={mainStyles.pageTitleWrapper}>
        <Typography variant={"h1"} className={mainStyles.pageTitle}>
          {t("welcome")}
        </Typography>
      </Box>
      <Stack direction={"row"} spacing={3} className={mainStyles.pageIntro}>
        <Box
          component="a"
          href="https://www.linkedin.com/in/bryanluwz/"
          target="_blank"
          rel="noopener noreferrer"
          className={cx(mainStyles.image, mainStyles.linkedImage)}
        >
          <Box
            component="img"
            alt="Description of image"
            src={PlaceholderImage}
            className={mainStyles.image}
          />
        </Box>
        <Stack direction={"column"} spacing={2} className={mainStyles.text}>
          <Typography variant={"h2"}>{t("introduction-title")}</Typography>
          <Typography variant={"body1"}>{t("introduction-text")}</Typography>
        </Stack>
      </Stack>
      <Grid2 container spacing={2} className={styles.cardGrid}>
        <Grid2 size={7}>
          <MainPageCard title="Work 1" superTitle="Work" />
        </Grid2>
        <Grid2 size={5}>
          <MainPageCard title="Chatbot" superTitle="AI & LLM" />
        </Grid2>
        <Grid2 size={5}>
          <MainPageCard title="Topic 3" superTitle="Insert something here" />
        </Grid2>
        <Grid2 size={7}>
          <MainPageCard title="Topic 4" superTitle="Insert something here" />
        </Grid2>
      </Grid2>
    </Stack>
  );
};

export default MainPage;
