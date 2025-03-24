import React from "react";
import cx from "classnames";
import { useTranslation } from "react-i18next";

import { Box, Grid2, Link, Stack } from "@mui/material";

import { PageCard } from "../../components/PageCard";
import { FadeWrapper } from "../../components/FadeWrapper";
import { CustomTypography } from "../../components/CustomTypography";
import { PageCardContentModel } from "../../apis/MainPage/typings";
import { PagesEnum } from "../../apis/enums";
import { useNavigationStore } from "../../redux/features/Navigation/hooks";

import * as mainStyles from "../style.scss";
import * as styles from "./style.scss";

import Mugshot from "../../../public/assets/mugshot.png";
import InternImage from "../../../public/assets/main-page/intern.png";
import ChatbotImage from "../../../public/assets/main-page/chatbot.png";
import CircuitBoardImage from "../../../public/assets/main-page/circuit-board.png";
import UniversityImage from "../../../public/assets/main-page/ntu.png";
import { SkillCard } from "../../components/SkillCard";

const pageCardsImages = [
  InternImage,
  ChatbotImage,
  CircuitBoardImage,
  UniversityImage,
];

export const MainPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { setCurrentRoute } = useNavigationStore();

  const pageCards = React.useMemo(() => {
    const numCards = pageCardsImages.length;

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

    const calculateBackgroundColor = (index: number) => {
      const colors = [
        "var(--pink)",
        "var(--mint)",
        "var(--rust)",
        "var(--baby-blue)",
      ];
      return colors[index % 4];
    };

    return (
      <Grid2 container spacing={3} className={styles.cardGrid}>
        {pageCardsImages.map((image: string, index: number) => {
          const cardContent = t(`main-page-cards.card-${index}.content`, {
            returnObjects: true,
          }) as unknown as PageCardContentModel[];
          const formattedCardContent = cardContent.map((content: any) => ({
            ...content,
            contentTitle: content["content-title"],
            contentBody: content["content-body"],
          }));

          return (
            <Grid2 key={`main-${index}`} size={calculateGridSize(index)}>
              <FadeWrapper>
                <PageCard
                  title={t(`main-page-cards.card-${index}.title`)}
                  superTitle={t(`main-page-cards.card-${index}.supertitle`)}
                  time={t(`main-page-cards.card-${index}.time`)}
                  company={t(`main-page-cards.card-${index}.company`)}
                  backgroundColor={calculateBackgroundColor(index)}
                  image={image}
                  content={formattedCardContent}
                />
              </FadeWrapper>
            </Grid2>
          );
        })}
      </Grid2>
    );
  }, [pageCardsImages, i18n.language]);

  const skillCards = React.useMemo(() => {
    const skills: { title: string; skills: string[] }[] = [
      t("skills.frontend", { returnObjects: true }),
      t("skills.backend", { returnObjects: true }),
      t("skills.ai", { returnObjects: true }),
      t("skills.others", { returnObjects: true }),
    ] as unknown as { title: string; skills: string[] }[];

    return (
      <FadeWrapper>
        <Stack className={styles.cardGrid} spacing={"var(--margin-sm)"}>
          {skills.map((skill, index) => {
            const skillTitle = skill.title;
            const skills = skill.skills;
            return (
              <SkillCard
                key={`skill-${index}`}
                skills={skills}
                skillTitle={skillTitle}
              />
            );
          })}
        </Stack>
      </FadeWrapper>
    );
  }, [i18n.language]);

  return (
    <Stack
      direction={"column"}
      spacing={"3rem"}
      alignItems={"center"}
      width={"100%"}
    >
      {/* Page title */}
      <Box className={mainStyles.pageTitleWrapper}>
        <FadeWrapper>
          <CustomTypography variant={"h1"} className={mainStyles.pageTitle}>
            {t("introduction.welcome")}
          </CustomTypography>
          <CustomTypography variant={"h2"}>
            {t("introduction.welcome-subtitle")}
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
              {t("introduction.text", { returnObjects: true })}
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
      {/* Skills */}
      <Stack
        direction={"column"}
        spacing={"var(--margin-sm)"}
        textAlign={"center"}
        className={mainStyles.pageContentTitle}
      >
        <FadeWrapper>
          <CustomTypography variant="h2">{t("skills.title")}</CustomTypography>
          <CustomTypography variant="subtitle1">
            {t("skills.description")}
          </CustomTypography>
        </FadeWrapper>
        {skillCards}
      </Stack>
      {/* Main page cards */}
      <Stack
        direction={"column"}
        spacing={"var(--margin-sm)"}
        textAlign={"center"}
        className={mainStyles.pageContentTitle}
      >
        <FadeWrapper>
          <CustomTypography variant="h2">
            {t("main-page-cards.title")}
          </CustomTypography>
          <CustomTypography variant="subtitle1">
            {t("main-page-cards.description")}
          </CustomTypography>
        </FadeWrapper>
        {pageCards}
      </Stack>
    </Stack>
  );
};

export default MainPage;
