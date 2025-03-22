import React from "react";
import { Box, Stack } from "@mui/material";

import * as styles from "./style.scss";
import cx from "classnames";
import { motion } from "framer-motion";
import { CustomTypography } from "../CustomTypography";
import { useNavigate } from "react-router-dom";

interface ImageCardProps {
  title?: string;
  src?: string;
  link?: string;
}

export const ImageCard: React.FC<ImageCardProps> = ({
  title = "Title",
  src = "",
  link = "",
}) => {
  const [isCardHovered, setIsCardHovered] = React.useState(false);
  const navigate = useNavigate();

  return (
    <Box className={styles.cardWrapper}>
      <motion.img
        className={cx(styles.cardImage, {
          [styles.link]: !!link,
        })}
        onClick={!!link ? () => navigate(link) : undefined}
        initial={{ transform: "scale(1)" }}
        animate={{ transform: "scale(1)" }}
        onHoverStart={() => setIsCardHovered(true)}
        onHoverEnd={() => setIsCardHovered(false)}
        src={src}
      />
      <motion.div
        className={styles.cardTitle}
        initial={{ opacity: 0, bottom: "-10%" }}
        animate={
          isCardHovered
            ? {
                opacity: 1,
                bottom: "0%",
              }
            : { opacity: 0, bottom: "-10%" }
        }
        transition={{ duration: 0.3 }}
      >
        <CustomTypography variant="h6">{title}</CustomTypography>
      </motion.div>
    </Box>
  );
};
