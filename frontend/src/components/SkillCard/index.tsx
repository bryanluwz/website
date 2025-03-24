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
        direction={{ xs: "column", sm: "row", md: "row" }}
        className={styles.cardContainer}
        spacing={2}
      >
        <Grid2
          size={{
            xs: 12,
            sm: 4,
            md: 3,
          }}
        >
          <CustomTypography variant="h6" sx={{ textAlign: "center" }}>
            {skillTitle}
          </CustomTypography>
        </Grid2>
        <Grid2
          size={{
            xs: 12,
            sm: 8,
            md: 9,
          }}
        >
          <Stack
            direction={"row"}
            className={styles.chipContainer}
            flexWrap="wrap"
            justifyContent={{
              xs: "center",
              sm: "flex-start",
              md: "flex-start",
            }}
            gap={1}
          >
            {skills.map((skill, index) => (
              <SkillChip key={`skill-${index}`} skill={skill} />
            ))}
          </Stack>
        </Grid2>
      </Grid2>
    </Box>
  );
};
