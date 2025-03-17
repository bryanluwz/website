import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { Stack } from "@mui/system";
import { Typography } from "@mui/material";

import { useNavigationStore } from "../../redux/features/Navigation/hooks";
import { PagesEnum } from "../../apis/enums";
import * as styles from "./style.scss";
import { useTranslation } from "react-i18next";

interface NavigationBarProps {}

const pages = Object.entries(PagesEnum);

export const NavigationBar: React.FC<NavigationBarProps> = () => {
  const { currentRoute, setCurrentRoute } = useNavigationStore();
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigation = (route: PagesEnum) => {
    dispatch(setCurrentRoute(route));
    navigate(route);
  };

  React.useEffect(() => {
    handleNavigation(currentRoute);
  }, [currentRoute]);

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
  }, [currentRoute, pages]);

  return (
    <Stack direction="row" spacing={2} className={styles.navBar}>
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
      <motion.div
        className={styles.navBarIndicator}
        layoutId="activeIndicator"
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
        animate={indicatorStyle}
      />
    </Stack>
  );
};
