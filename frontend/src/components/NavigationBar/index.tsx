import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { Stack } from "@mui/system";
import { Box, Typography } from "@mui/material";
import cx from "classnames";

import { useTranslation } from "react-i18next";
import { SupportedLanguages } from "../../i18n";
import { useNavigationStore } from "../../redux/features/Navigation/hooks";
import { PagesEnum } from "../../apis/enums";
import * as styles from "./style.scss";

interface NavigationBarProps {}

const pages = Object.entries(PagesEnum);

export const NavigationBar: React.FC<NavigationBarProps> = () => {
  const { currentRoute, setCurrentRoute } = useNavigationStore();
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigation = (route: PagesEnum) => {
    dispatch(setCurrentRoute(route));
    navigate(route);
  };

  React.useEffect(() => {
    handleNavigation(currentRoute);
  }, [currentRoute]);

  // Set indicator styles
  const [indicatorStyle, setIndicatorStyle] = React.useState({
    left: 0,
    width: 0,
    height: 0,
  });
  const navRefs = React.useRef<{ [key: number]: HTMLSpanElement | null }>({}); // Store refs for each tab

  React.useEffect(() => {
    const activeIndex = Math.max(
      pages.findIndex((page) => page[1] === currentRoute),
      0
    );
    const activeTab = navRefs.current[activeIndex];

    if (activeTab) {
      setIndicatorStyle({
        left: activeTab.offsetLeft,
        width: activeTab.offsetWidth,
        height: activeTab.offsetHeight,
      });
    }
  }, [currentRoute, pages, i18n.language]);

  // Set navigation bar styles
  const [navBarStyles, setNavBarStyles] = React.useState({});

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setNavBarStyles({
          backgroundColor: "var(--secondary-background-color) !important",
          backdropFilter: " blur(10px)",
        });
      } else {
        setNavBarStyles({});
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle language change (cycle through languages)
  const handleLanguageChange = () => {
    const langs = Object.keys(SupportedLanguages);
    const currentLangIndex = langs.indexOf(i18n.language);
    const nextLangIndex = (currentLangIndex + 1) % langs.length;
    i18n.changeLanguage(langs[nextLangIndex]);
  };

  return (
    <Box className={styles.wrapper}>
      <Stack
        direction="row"
        spacing={2}
        className={styles.navBar}
        sx={navBarStyles}
      >
        {pages.map((value, index) => (
          <Typography
            variant="h6"
            ref={(el) => (navRefs.current[index] = el)}
            className={styles.navBarElement}
            key={index}
            onClick={() => setCurrentRoute(value[1])}
          >
            {t(value[0])}
          </Typography>
        ))}
        <Typography
          variant="subtitle2"
          className={cx(styles.navBarElement, styles.language)}
          onClick={handleLanguageChange}
        >
          {SupportedLanguages[i18n.language as keyof typeof SupportedLanguages]}
        </Typography>
        <motion.div
          className={styles.navBarIndicator}
          layoutId="activeIndicator"
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
          animate={indicatorStyle}
        />
      </Stack>
    </Box>
  );
};
