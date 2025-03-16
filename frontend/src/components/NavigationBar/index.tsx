import React from "react";
import { useNavigationStore } from "../../redux/features/Navigation/hooks";
import { Box, Stack } from "@mui/system";
import { Typography } from "@mui/material";
import { PagesEnum } from "../../apis/enums";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as styles from "./style.scss";
import { motion } from "framer-motion";
import cx from "classnames";

interface NavigationBarProps {}

const pages = Object.entries(PagesEnum);

export const NavigationBar: React.FC<NavigationBarProps> = () => {
  const { currentRoute, setCurrentRoute } = useNavigationStore();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigation = (route: PagesEnum) => {
    dispatch(setCurrentRoute(route));
    navigate(route);
  };

  React.useEffect(() => {
    handleNavigation(currentRoute);
  }, [currentRoute]);

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [indicatorStyle, setIndicatorStyle] = React.useState({
    left: 0,
    width: 0,
  });
  const navRefs = React.useRef<{ [key: number]: HTMLSpanElement | null }>({}); // Store refs for each tab

  React.useEffect(() => {
    const activeIndex = pages.findIndex((page) => page[1] === currentRoute);
    const activeTab = navRefs.current[activeIndex];

    if (activeTab) {
      setIndicatorStyle({
        left: activeTab.offsetLeft,
        width: activeTab.offsetWidth,
      });
    }
  }, [currentRoute, pages]);

  React.useEffect(() => {
    const index = pages.findIndex((page) => page[1] === currentRoute);
    setActiveIndex(index);
  }, [currentRoute, pages]);

  return (
    <Box>
      <Stack direction="row" spacing={2} className={styles.navBar}>
        {pages.map((value, index) => (
          <Typography
            ref={(el) => (navRefs.current[index] = el)}
            className={styles.navBarElement}
            key={index}
            onClick={() => setCurrentRoute(value[1])}
          >
            {value[0]}
          </Typography>
        ))}
        <motion.div
          className={styles.navBarIndicator}
          layoutId="activeIndicator"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          animate={indicatorStyle}
        />
      </Stack>
    </Box>
  );
};
