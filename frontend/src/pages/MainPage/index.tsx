import React from "react";
import cx from "classnames";
import { useTranslation } from "react-i18next";
import { Box, Grid2, Link, Stack, Typography } from "@mui/material";

import { PageCard } from "../../components/PageCard";
import Mugshot from "../../../public/assets/mugshot.png";
import * as mainStyles from "../style.scss";
import * as styles from "./style.scss";
import { FadeWrapper } from "../../components/FadeWrapper";
import { useMainPageStore } from "../../redux/features/MainPage/hooks";
import {
  PageCardContentModel,
  PageCardModel,
} from "../../apis/MainPage/typings";
import { useNavigationStore } from "../../redux/features/Navigation/hooks";
import { PagesEnum } from "../../apis/enums";
import { CustomTypography } from "../../components/CustomTypography";

export const MainPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { setCurrentRoute } = useNavigationStore();
  const { mainPageCards, getMainPageCards } = useMainPageStore();

  React.useEffect(() => {
    getMainPageCards();
  }, []);

  const gridCards = React.useMemo(() => {
    if (!mainPageCards) return null;
    const numCards = mainPageCards.length;

    const calculateGridSize = (index: number) => {
      // The order of the grid size for md is 5, 7, 7, 5 repeating,
      // unless it's the last card and it is odd, then it's 12
      // The order of the grid size fro sm is 12 repeating
      const mdGridSizes = [5, 7, 7, 5];
      const smGridSizes = [12, 12, 12, 12];

      if (index === numCards - 1 && index % 2 === 0) {
        return {
          xs: 12,
          sm: 12,
          md: 12,
        };
      } else if (index % 2 === 0) {
        return {
          xs: smGridSizes[index % 4],
          sm: smGridSizes[index % 4],
          md: mdGridSizes[index % 4],
        };
      } else {
        return {
          xs: smGridSizes[index % 4],
          sm: smGridSizes[index % 4],
          md: mdGridSizes[(index + 1) % 4],
        };
      }
    };

    return (
      <Grid2 container spacing={3} className={styles.cardGrid}>
        {mainPageCards.map((card: PageCardModel, index: number) => {
          const cardContent = t(`main-page-cards.${card.content}`, {
            returnObjects: true,
          }) as unknown as PageCardContentModel[];
          const formattedCardContent = cardContent.map((content: any) => ({
            ...content,
            contentTitle: content["content-title"],
            contentBody: content["content-body"],
          }));

          return (
            <Grid2 key={`main-${index}`} size={calculateGridSize(index)}>
              <FadeWrapper delay={0.5}>
                <PageCard
                  title={t(`main-page-cards.${card.title}`)}
                  superTitle={t(`main-page-cards.${card.supertitle}`)}
                  time={t(`main-page-cards.${card.time}`)}
                  company={t(`main-page-cards.${card.company}`)}
                  backgroundColor={card.backgroundColor}
                  image={card.image}
                  content={formattedCardContent}
                />
              </FadeWrapper>
            </Grid2>
          );
        })}
      </Grid2>
    );
  }, [mainPageCards, i18n.language]);

  return (
    <Stack
      direction={"column"}
      spacing={"4rem"}
      alignItems={"center"}
      width={"100%"}
    >
      {/* Page title */}
      <Box className={mainStyles.pageTitleWrapper}>
        <FadeWrapper>
          <CustomTypography variant={"h1"} className={mainStyles.pageTitle}>
            {t("introduction.welcome")}
          </CustomTypography>
        </FadeWrapper>
      </Box>
      {/* Main page intro */}
      <Stack
        direction={{
          sm: "column",
          md: "row",
        }}
        spacing={4}
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
            <CustomTypography variant={"h3"}>
              {t("introduction.title")}
            </CustomTypography>
          </FadeWrapper>
          <FadeWrapper delay={0.3}>
            <CustomTypography variant={"body1"}>
              {t("introduction.text")}
            </CustomTypography>
          </FadeWrapper>
          <FadeWrapper delay={0.3}>
            <Link
              className={mainStyles.link}
              onClick={() => {
                setCurrentRoute(PagesEnum.about);
              }}
            >
              <CustomTypography variant="subtitle2">
                {t("introduction.learn-more") + " →"}
              </CustomTypography>
            </Link>
          </FadeWrapper>
        </Stack>
      </Stack>
      {/* TODO: Add skills here */}
      {/* Main page cards */}
      <FadeWrapper delay={0.5}>
        <Stack direction={"column"} spacing={0} alignItems={"center"}>
          <CustomTypography variant="h2">
            {t("main-page-cards.title")}
          </CustomTypography>
          <CustomTypography variant="subtitle1">
            {t("main-page-cards.description")}
          </CustomTypography>
        </Stack>
      </FadeWrapper>
      {gridCards}
    </Stack>
  );
};

export default MainPage;
