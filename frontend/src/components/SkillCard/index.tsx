import React from "react";

import { Box, Grid2, Stack } from "@mui/material";
import { CustomTypography } from "../CustomTypography";
import { SkillChip } from "./SkillChip";

import * as styles from "./styles.scss";

interface SkillCardProps {
  skillTitle: string;
  skills: string[];
}

export const SkillCard: React.FC<SkillCardProps> = ({ skillTitle, skills }) => {
  return (
    <Box className={styles.cardWrapper}>
      <Grid2
        container
        direction={"row"}
        className={styles.cardContainer}
        spacing={2}
      >
        <Grid2
          size={{
            xs: 4,
            sm: 4,
            md: 4,
          }}
        >
          <CustomTypography variant="h6">{skillTitle}</CustomTypography>
        </Grid2>
        <Grid2
          size={{
            xs: 8,
            sm: 8,
            md: 8,
          }}
        >
          <Stack direction={"row"} className={styles.cardTitle} flexWrap="wrap">
            {skills.map((skill, index) => (
              <SkillChip key={`skill-${index}`} skill={skill} />
            ))}
          </Stack>
        </Grid2>
      </Grid2>
    </Box>
  );
};
