import React from "react";
import cx from "classnames";
import { useTranslation } from "react-i18next";
import { Box, Grid2, Link, Stack, Typography } from "@mui/material";

import * as mainStyles from "../style.scss";
import * as styles from "./style.scss";
import { FadeWrapper } from "../../components/FadeWrapper";

import MugshotWindy from "../../../public/assets/mugshot-windy.png";
import { CustomTypography } from "../../components/CustomTypography";

export const AboutPage: React.FC = () => {
  const { t, i18n } = useTranslation();

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
      {/* My personal values + backstory + where im from + my favourite food + beef with penang */}
      <Stack
        direction={{
          sm: "column",
          md: "row",
        }}
        spacing={4}
        className={mainStyles.pageIntro}
      >
        <Stack direction={"column"} spacing={2} className={mainStyles.text}>
          <FadeWrapper delay={0.3}>
            <CustomTypography variant={"h3"}>
              {t("about.more-info.title")}
            </CustomTypography>
          </FadeWrapper>
          <FadeWrapper delay={0.3}>
            <Stack direction={"column"} spacing={2}>
              <CustomTypography
                variant={"body1"}
                parseLinks={{
                  parseLinks: true,
                  addLinkIcon: true,
                  linkProps: { className: mainStyles.link },
                }}
              >
                {t("about.more-info.text", { returnObjects: true })}
              </CustomTypography>
            </Stack>
          </FadeWrapper>
        </Stack>
      </Stack>
      {/* Some random images and stuff */}
    </Stack>
  );
};

export default AboutPage;
