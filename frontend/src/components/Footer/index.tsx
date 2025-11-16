import React from "react";
import { useTranslation } from "react-i18next";
import { Grid2, Link, Stack } from "@mui/material";
import { CustomTypography } from "../CustomTypography";

import * as styles from "./style.scss";
import Resume from "../../../public/assets/Resume.pdf";
import { useNavigationStore } from "../../redux/features/Navigation/hooks";

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const { toggleChatbot } = useNavigationStore();

  return (
    <Grid2 container spacing={2} className={styles.container}>
      <Grid2 size={{ xs: 1, sm: 0 }} display={{ xs: "none", sm: "block" }} />
      <Grid2 size={{ xs: 10, sm: 5 }} display={{ xs: "none", sm: "block" }}>
        <Stack direction="row" spacing={1}>
          <CustomTypography variant="subtitle2">
            {t("footer.copyright")}
          </CustomTypography>
          <CustomTypography variant="subtitle2">&#8226;</CustomTypography>
          <Link
            className={styles.link}
            target="_blank"
            href="https://github.com/bryanluwz/website"
          >
            <CustomTypography variant="subtitle2">
              {t("footer.sauce")}
            </CustomTypography>
          </Link>
        </Stack>
      </Grid2>
      <Grid2 size={{ xs: 5, sm: 3 }}>
        <Stack direction="column" spacing={{ xs: 1, sm: 2 }}>
          <CustomTypography variant="body2">
            {t("footer.links")}
          </CustomTypography>
          <Stack direction="column" spacing={1}>
            <Link
              className={styles.link}
              target="_blank"
              href="https://www.linkedin.com/in/bryanluwz/"
            >
              <CustomTypography variant="subtitle2">
                {t("footer.linkedin")}
              </CustomTypography>
            </Link>
            <Link
              className={styles.link}
              target="_blank"
              href="https://github.com/bryanluwz"
            >
              <CustomTypography variant="subtitle2">
                {t("footer.github")}
              </CustomTypography>
            </Link>
            <Link
              className={styles.link}
              target="_blank"
              href="https://www.instagram.com/bryanluwezhern/"
            >
              <CustomTypography variant="subtitle2">
                {t("footer.instagram")}
              </CustomTypography>
            </Link>
            <Link
              className={styles.link}
              target="_blank"
              href="mailto:bryanlu.my@gmail.com"
            >
              <CustomTypography variant="subtitle2">
                {t("footer.email")}
              </CustomTypography>
            </Link>
            <Link className={styles.link} target="_blank" href={Resume}>
              <CustomTypography variant="subtitle2">
                {t("footer.resume")}
              </CustomTypography>
            </Link>
          </Stack>
        </Stack>
      </Grid2>
      <Grid2 size={{ xs: 5, sm: 2 }}>
        <Stack direction="column" spacing={{ xs: 1, sm: 2 }}>
          <CustomTypography variant="body2">
            {t("footer.message")}
          </CustomTypography>
          <Stack direction={"column"} spacing={1}>
            <Link className={styles.link} onClick={toggleChatbot}>
              <CustomTypography variant="subtitle2">
                {t("footer.chat")}
              </CustomTypography>
            </Link>
          </Stack>
        </Stack>
      </Grid2>
      <Grid2 size={{ xs: 3, sm: 2 }} />
      <Grid2 size={{ xs: 1, sm: 0 }} display={{ sm: "none" }} />
      <Grid2 size={{ xs: 10, sm: 5 }} display={{ sm: "none" }}>
        <Stack direction="row" spacing={1}>
          <CustomTypography variant="subtitle2">
            {t("footer.copyright")}
          </CustomTypography>
          <CustomTypography variant="subtitle2">&#8226;</CustomTypography>
          <Link
            className={styles.link}
            target="_blank"
            href={"https://github.com/bryanluwz/website"}
          >
            <CustomTypography variant="subtitle2">
              {t("footer.sauce")}
            </CustomTypography>
          </Link>
        </Stack>
      </Grid2>
    </Grid2>
  );
};
