import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { Stack } from "@mui/system";
import { Box, Icon, Typography } from "@mui/material";
import cx from "classnames";

import { useTranslation } from "react-i18next";
import { SupportedLanguages } from "../../i18n";
import { useNavigationStore } from "../../redux/features/Navigation/hooks";
import { PagesEnum } from "../../apis/enums";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
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
    if (!currentRoute) {
      return;
    }
    handleNavigation(currentRoute);
  }, [currentRoute]);

  // Set indicator styles
  const [indicatorStyle, setIndicatorStyle] = React.useState({
    left: 0,
    width: 0,
    height: 0,
  });
  const [updateIndicatorBool, setUpdateIndicatorBool] = React.useState(false); // Stupid apple safari bug
  const navRefs = React.useRef<{ [key: number]: HTMLSpanElement | null }>({}); // Store refs for each tab
  const [updateIndicatorTimeoutId, setUpdateIndicatorTimeoutId] =
    React.useState<NodeJS.Timeout | null>(null);

  const updateIndicator = () => {
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
  };

  React.useEffect(() => {
    updateIndicator();
    const activeIndex = pages.findIndex((page) => page[1] === currentRoute);
    const pageName = pages[activeIndex] ?? pages[0];

    const title = t(`navigation.${pageName[0]}`);
    document.title = `Bryan Lu ${String.fromCharCode(8226)} 
    ${title}`;
  }, [pages, i18n.language]);

  React.useEffect(() => {
    updateIndicator();
  }, [currentRoute]);

  React.useEffect(() => {
    if (updateIndicatorBool) {
      updateIndicator();
      setUpdateIndicatorBool(false);
    }
  }, [updateIndicatorBool]);

  React.useEffect(() => {
    const handleResize = () => {
      if (updateIndicatorTimeoutId) {
        clearTimeout(updateIndicatorTimeoutId);
      }
      setUpdateIndicatorTimeoutId(
        setTimeout(() => {
          setUpdateIndicatorBool(true);
        }, 300)
      );
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Set navigation bar styles
  const [navBarStyles, setNavBarStyles] = React.useState({});

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setNavBarStyles({
          backgroundColor: "var(--secondary-background-color) !important",
          backdropFilter: "blur(50px)",
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

  // Handle dark mode
  const [darkMode, setDarkMode] = React.useState(false);

  React.useEffect(() => {
    // Check local storage you mei you
    const darkMode = localStorage.getItem("darkMode");
    if (darkMode) {
      if (darkMode == "true") {
        document.documentElement.setAttribute("data-theme", "dark");
        setDarkMode(true);
      } else {
        document.documentElement.setAttribute("data-theme", "light");
        setDarkMode(false);
      }
    } else {
      // Check prefers color scheme
      const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
      if (prefersDarkMode.matches) {
        document.documentElement.setAttribute("data-theme", "dark");
        setDarkMode(true);
      } else {
        document.documentElement.setAttribute("data-theme", "light");
        setDarkMode(false);
      }
    }
  }, []);

  const handleDarkModeChange = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.setAttribute(
      "data-theme",
      newDarkMode ? "dark" : "light"
    );
    localStorage.setItem("darkMode", newDarkMode ? "true" : "false");
  };

  return (
    <Box className={styles.wrapper}>
      <Stack
        direction="row"
        spacing={0}
        className={styles.navBar}
        sx={navBarStyles}
      >
        <Icon
          color="secondary"
          className={cx(styles.navBarElement, styles.language)}
          onClick={handleDarkModeChange}
        >
          {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </Icon>
        {pages.map((value, index) => (
          // I dont know why this woudlnt work work CustomTypography
          <Typography
            variant="h6"
            ref={(el) => (navRefs.current[index] = el)}
            className={styles.navBarElement}
            key={index}
            onClick={() => setCurrentRoute(value[1])}
          >
            {t(`navigation.${value[0]}`)}
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
