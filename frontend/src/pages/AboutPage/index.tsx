import React from "react";
import cx from "classnames";
import { useTranslation } from "react-i18next";
import { Box, Grid2, Stack } from "@mui/material";

import * as mainStyles from "../style.scss";
import * as mainPageStyles from "../MainPage/style.scss";
import { FadeWrapper } from "../../components/FadeWrapper";

import { CustomTypography } from "../../components/CustomTypography";
import { ImageCard } from "../../components/ImageCard";

import MugshotWindy from "../../../public/assets/about-page/mugshot-windy.png";
import Interest1 from "../../../public/assets/about-page/food-expensive-pasta.png";
import Interest2 from "../../../public/assets/about-page/food-kartoffelpuffer.png";
import Interest3 from "../../../public/assets/about-page/food-laksa.png";
import Interest4 from "../../../public/assets/about-page/travel-titlis.png";
import Interest5 from "../../../public/assets/about-page/travel-mondsee.png";

const imageCardsImages: string[] = [
  Interest1,
  Interest2,
  Interest3,
  Interest4,
  Interest5,
];

export const AboutPage: React.FC = () => {
  const { t, i18n } = useTranslation();

  const gridCards = React.useMemo(() => {
    const numCards = imageCardsImages.length;

    const calculateGridSize = (index: number) => {
      // If this index is in a row that has 3 cards, then it should be 3, 5, 3, 5, 3, 5
      // If this index is in a row that has 2 cards, then it should be 5, 7, 7, 5
      // If this index is in a row that has 1 card, then it should be 12
      const mdGridSizes_3 = [4, 4, 4, 4, 4, 4];
      const mdGridSizes_2 = [6, 6];
      const smGridSizes = [12, 12, 12, 12];

      if (
        numCards % 3 === 2 &&
        (index === numCards - 2 || index === numCards - 1)
      ) {
        // Two cards leftover in last row
        return {
          xs: smGridSizes[index % 4],
          sm: smGridSizes[index % 4],
          md: mdGridSizes_2[index % 2],
        };
      } else if (numCards % 3 === 1 && index === numCards - 1) {
        // One card leftover in last row
        return {
          xs: smGridSizes[index % 4],
          sm: smGridSizes[index % 4],
          md: smGridSizes[index % 4],
        };
      } else {
        // Three cards int this row
        return {
          xs: smGridSizes[index % 4],
          sm: smGridSizes[index % 4],
          md: mdGridSizes_3[index % 6],
        };
      }
    };

    return (
      <Grid2 container spacing={3} className={mainPageStyles.cardGrid}>
        {imageCardsImages.map((image, index) => (
          <Grid2 key={`about-${index}`} size={calculateGridSize(index)}>
            <FadeWrapper>
              <ImageCard
                title={t(`about.interests.images.${index}.title`)}
                src={image}
                link={
                  t(`about.interests.images.${index}.link`, {
                    defaultValue: "",
                  }) || undefined
                }
              />
            </FadeWrapper>
          </Grid2>
        ))}
      </Grid2>
    );
  }, [i18n.language]);

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
            {t("about.welcome")}
          </CustomTypography>
        </FadeWrapper>
      </Box>
      {/* About myself, intro title + text, with a more fun image of myself */}
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
          // href="https://www.linkedin.com/in/bryanluwz/"
          target="_blank"
          rel="noopener noreferrer"
          className={mainStyles.image}
        >
          <FadeWrapper delay={0.3}>
            <Box
              component="img"
              alt="Description of image"
              src={MugshotWindy}
              className={mainStyles.image}
            />
          </FadeWrapper>
        </Box>
        <Stack direction={"column"} spacing={2} className={mainStyles.text}>
          <FadeWrapper delay={0.3}>
            <CustomTypography variant={"h3"}>
              {t("about.introduction.title")}
            </CustomTypography>
          </FadeWrapper>
          <FadeWrapper delay={0.3}>
            <Stack direction={"column"} spacing={2}>
              <CustomTypography
                variant={"body1"}
                parseLinks={{ parseLinks: true }}
              >
                {t("about.introduction.text", { returnObjects: true })}
              </CustomTypography>
            </Stack>
          </FadeWrapper>
        </Stack>
      </Stack>
      {/* My personal values + backstory + where im from  */}
      <Stack
        direction={{
          sm: "column",
          md: "row",
        }}
        spacing={4}
        className={cx(mainStyles.pageIntro, mainStyles.centered)}
      >
        <Stack direction={"column"} spacing={5} className={mainStyles.text}>
          <FadeWrapper delay={0.3}>
            <CustomTypography variant={"h3"} className={mainStyles.centered}>
              {t("about.more-info.title")}
            </CustomTypography>
          </FadeWrapper>
          <FadeWrapper delay={0.3}>
            <Stack direction={"column"} spacing={3}>
              <CustomTypography
                variant={"body1"}
                parseLinks={{
                  linkProps: { className: mainStyles.link },
                }}
              >
                {t("about.more-info.text", { returnObjects: true })}
              </CustomTypography>
            </Stack>
          </FadeWrapper>
        </Stack>
      </Stack>
      {/* Some interesting facts or something */}
      <Stack
        direction={"column"}
        spacing={4}
        className={cx(mainStyles.pageIntro, mainStyles.centered)}
      >
        <Stack direction={"column"} spacing={5} className={mainStyles.text}>
          <FadeWrapper delay={0.3}>
            <CustomTypography variant={"h3"} className={mainStyles.centered}>
              {t("about.interests.title")}
            </CustomTypography>
          </FadeWrapper>
          <FadeWrapper delay={0.3}>
            <Stack direction={"column"} spacing={3}>
              <CustomTypography
                variant={"body1"}
                parseLinks={{
                  linkProps: { className: mainStyles.link },
                }}
              >
                {t("about.interests.text", { returnObjects: true })}
              </CustomTypography>
            </Stack>
          </FadeWrapper>
        </Stack>
      </Stack>
      {/* Some interesting images and stuff */}

      <Stack
        direction={"column"}
        spacing={"var(--margin-sm)"}
        textAlign={"center"}
        className={mainStyles.pageContentTitle}
      >
        {gridCards}
      </Stack>
    </Stack>
  );
};

export default AboutPage;
