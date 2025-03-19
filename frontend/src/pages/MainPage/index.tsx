import React from "react";
import cx from "classnames";
import { useTranslation } from "react-i18next";
import { Box, Grid2, Stack, Typography } from "@mui/material";

import { MainPageCard } from "../../components/MainPageCard";
import Mugshot from "../../../public/assets/mugshot.png";
import * as mainStyles from "../style.scss";
import * as styles from "./style.scss";
import { FadeWrapper } from "../../components/FadeWrapper";

export const MainPage: React.FC = () => {
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
            {t("welcome")}
          </Typography>
        </FadeWrapper>
      </Box>
      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        spacing={3}
        className={mainStyles.pageIntro}
      >
        <Box
          component="a"
          href="https://www.linkedin.com/in/bryanluwz/"
          target="_blank"
          rel="noopener noreferrer"
          className={cx(mainStyles.image, mainStyles.linkedImage)}
        >
          <FadeWrapper delay={0.3}>
            <Box
              component="img"
              alt="Description of image"
              src={Mugshot}
              className={mainStyles.image}
            />
          </FadeWrapper>
        </Box>
        <Stack direction={"column"} spacing={2} className={mainStyles.text}>
          <FadeWrapper delay={0.3}>
            <Typography variant={"h2"}>{t("introduction-title")}</Typography>
          </FadeWrapper>
          <FadeWrapper delay={0.3}>
            <Typography variant={"body1"}>{t("introduction-text")}</Typography>
          </FadeWrapper>
        </Stack>
      </Stack>
      <Grid2 container spacing={3} className={styles.cardGrid}>
        <Grid2
          size={{
            xs: 12,
            sm: 7,
          }}
        >
          <FadeWrapper delay={0.5}>
            <MainPageCard
              title="Frontend Developer Intern"
              superTitle="Experience"
            />
          </FadeWrapper>
        </Grid2>
        <Grid2
          size={{
            xs: 12,
            sm: 5,
          }}
        >
          <FadeWrapper delay={0.5}>
            <MainPageCard title="Full Stack Chatbot" superTitle="Experience" />
          </FadeWrapper>
        </Grid2>
        <Grid2
          size={{
            xs: 12,
            sm: 5,
          }}
        >
          <FadeWrapper delay={0.5}>
            <MainPageCard title="Embedded Programming" superTitle="Projects" />
          </FadeWrapper>
        </Grid2>
        <Grid2
          size={{
            xs: 12,
            sm: 7,
          }}
        >
          <FadeWrapper delay={0.5}>
            <MainPageCard
              title="First Class Honours"
              superTitle="Nanyang Technological University"
            />
          </FadeWrapper>
        </Grid2>
      </Grid2>
    </Stack>
  );
};

export default MainPage;
