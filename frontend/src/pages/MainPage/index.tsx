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
      {/* Page title */}
      <Box className={mainStyles.pageTitleWrapper}>
        <FadeWrapper>
          <Typography variant={"h1"} className={mainStyles.pageTitle}>
            {t("welcome")}
          </Typography>
        </FadeWrapper>
      </Box>
      {/* Main page intro */}
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
            <Typography variant={"h3"}>{t("introduction-title")}</Typography>
          </FadeWrapper>
          <FadeWrapper delay={0.3}>
            <Typography variant={"h5"}>{t("introduction-text")}</Typography>
          </FadeWrapper>
        </Stack>
      </Stack>
      {/* Main page cards */}
      <FadeWrapper delay={0.5}>
        <Typography variant="h2">{t("main-page-card-title")}</Typography>
      </FadeWrapper>
      <Grid2 container spacing={3} className={styles.cardGrid}>
        <Grid2
          size={{
            xs: 12,
            sm: 7,
          }}
        >
          <FadeWrapper delay={0.5}>
            <MainPageCard
              title="Frontend Software Developer"
              superTitle="Internship"
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
            <MainPageCard
              title="Full Stack Chatbot"
              superTitle="LLM + AI + Software Development"
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
            <MainPageCard
              title="Autonomous Vehicle Navigation"
              superTitle="Embedded Programming"
            />
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
              content={{
                "1": {
                  title: "ASEAN Scholar",
                  content: "Rewardee of the ASEAN Scholarship",
                },
                "2": {
                  title: "Computer Engineering",
                  content: "First Class Honours",
                },
                "3": {
                  title: "Dean's List",
                  content: "Awarded Dean's List for 100 semesters",
                },
              }}
            />
          </FadeWrapper>
        </Grid2>
      </Grid2>
    </Stack>
  );
};

export default MainPage;
