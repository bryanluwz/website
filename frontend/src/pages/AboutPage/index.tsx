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
        {imageCardsImages.map((image, index) => (
          <Grid2 key={`about-${index}`} size={calculateGridSize(index)}>
            <FadeWrapper delay={0.5}>
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
          className={cx(mainStyles.image, mainStyles.linkedImage)}
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
      {gridCards}
    </Stack>
  );
};

export default AboutPage;
