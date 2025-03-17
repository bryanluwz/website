import React from "react";
import { Stack, Typography } from "@mui/material";

import * as styles from "./style.scss";

interface MainPageCardProps {
  title?: string;
  superTitle?: string; // if subtitle is under the title, then supertitle should be above right?
  backgroundColor?: string;
}

export const MainPageCard: React.FC<MainPageCardProps> = ({
  title = "Title",
  superTitle = "Super Title",
  backgroundColor = "white",
}) => {
  return (
    <Stack
      spacing={0}
      className={styles.card}
      style={{ backgroundColor: backgroundColor }}
    >
      <Typography variant="subtitle1">{superTitle}</Typography>
      <Typography variant="h2">{title}</Typography>
    </Stack>
  );
};
