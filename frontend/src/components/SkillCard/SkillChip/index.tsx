import React from "react";

import { Chip } from "@mui/material";
import { CustomTypography } from "../../CustomTypography";

import * as styles from "../styles.scss";

interface SkillChipProps {
  skill: string;
}

export const SkillChip: React.FC<SkillChipProps> = ({ skill }) => {
  return (
    <Chip
      className={styles.chip}
      label={<CustomTypography variant="subtitle1">{skill}</CustomTypography>}
    />
  );
};
