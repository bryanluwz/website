import React from "react";
import cx from "classnames";
import { useTranslation } from "react-i18next";
import { Box, Grid2, Stack, Typography } from "@mui/material";

import { MainPageCard } from "../../components/MainPageCard";
import Mugshot from "../../../public/assets/mugshot.png";
import * as mainStyles from "../style.scss";
import * as styles from "./style.scss";
import { FadeWrapper } from "../../components/FadeWrapper";
import { useMainPageStore } from "../../redux/features/MainPage/hooks";
import { MainPageCardModel } from "../../apis/MainPage/typings";

export const MainPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { mainPageCards, getMainPageCards } = useMainPageStore();

  React.useEffect(() => {
    getMainPageCards();
  }, []);

  const gridCards = React.useMemo(() => {
    if (!mainPageCards) return null;
    const numCards = mainPageCards.length;

    const calculateGridSize = (index: number) => {
      // The order of the grid size for sm is 7, 5, 5, 7 repeating,
      // unless it's the last card and it is odd, then it's 12
      // The order of the grid size fro xs is 12 repeating
      const smGridSizes = [7, 5, 5, 7];
      const xsGridSizes = [12, 12, 12, 12];

      if (index === numCards - 1 && index % 2 === 0) {
        return {
          xs: 12,
          sm: 12,
        };
      } else if (index % 2 === 0) {
        return {
          xs: xsGridSizes[index % 4],
          sm: smGridSizes[index % 4],
        };
      } else {
        return {
          xs: xsGridSizes[index % 4],
          sm: smGridSizes[(index + 1) % 4],
        };
      }
    };

    return (
      <Grid2 container spacing={3} className={styles.cardGrid}>
        {mainPageCards.map((card: MainPageCardModel, index: number) => {
          return (
            <Grid2 key={index} size={calculateGridSize(index)}>
              <FadeWrapper delay={0.5}>
                <MainPageCard
                  title={t(card.title ?? "title")}
                  superTitle={t(card.supertitle ?? "supertitle")}
                  backgroundColor={card.backgroundColor}
                  image={card.image}
                  content={card.content}
                />
              </FadeWrapper>
            </Grid2>
          );
        })}
      </Grid2>
    );
  }, [mainPageCards]);

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
            {t("introduction.welcome")}
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
            <Typography variant={"h3"}>{t("introduction.title")}</Typography>
          </FadeWrapper>
          <FadeWrapper delay={0.3}>
            <Typography variant={"h5"}>{t("introduction.text")}</Typography>
          </FadeWrapper>
        </Stack>
      </Stack>
      {/* Main page cards */}
      <FadeWrapper delay={0.5}>
        <Typography variant="h2">{t("main-page-cards.title")}</Typography>
      </FadeWrapper>
      {gridCards}
    </Stack>
  );
};

export default MainPage;
