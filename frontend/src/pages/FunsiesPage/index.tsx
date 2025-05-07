import React from "react";
import { Box, Grid2, Stack } from "@mui/material";

import * as mainStyles from "../style.scss";
import * as mainPageStyles from "../MainPage/style.scss";
import { FadeWrapper } from "../../components/FadeWrapper";
import { CustomTypography } from "../../components/CustomTypography";
import { useTranslation } from "react-i18next";
import { PageCard } from "../../components/PageCard";

const funsiesCardsImages: string[] = [""];

export const FunsiesPage: React.FC = () => {
  const { t, i18n } = useTranslation();

  const pageCards = React.useMemo(() => {
    const numCards = funsiesCardsImages.length;

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
      <Grid2 container spacing={3} className={mainPageStyles.cardGrid}>
        {funsiesCardsImages.map((image: string, index: number) => {
          return (
            <Grid2 key={`funsies-${index}`} size={calculateGridSize(index)}>
              <FadeWrapper>
                <PageCard
                  title={t(`funsies-page-cards.card-${index}.title`)}
                  superTitle={t(`funsies-page-cards.card-${index}.supertitle`)}
                  time={t(`funsies-page-cards.card-${index}.time`, {
                    defaultValue: "",
                  })}
                  image={image}
                  backgroundColor="var(--secondary-background-color-dark, var(--secondary-background-color))"
                />
              </FadeWrapper>
            </Grid2>
          );
        })}
      </Grid2>
    );
  }, [funsiesCardsImages, i18n.language]);

  return (
    <Stack
      direction={"column"}
      spacing={"4rem"}
      alignItems={"center"}
      width={"100%"}
    >
      {/* Funsies page title */}
      <Box className={mainStyles.pageTitleWrapper}>
        <FadeWrapper>
          <CustomTypography variant={"h1"} className={mainStyles.pageTitle}>
            {t("funsies.welcome")}
          </CustomTypography>
          <CustomTypography variant={"h2"}>
            {t("funsies.welcome-subtitle")}
          </CustomTypography>
        </FadeWrapper>
      </Box>
      {/* Funsies page cards */}
      <Stack
        direction={"column"}
        spacing={"var(--margin-sm)"}
        textAlign={"center"}
        className={mainStyles.pageContentTitle}
      >
        <FadeWrapper>
          <CustomTypography variant="h2">
            {t("funsies-page-cards.title")}
          </CustomTypography>
          <CustomTypography variant="subtitle1">
            {t("funsies-page-cards.description")}
          </CustomTypography>
        </FadeWrapper>
        {pageCards}
      </Stack>
    </Stack>
  );
};
