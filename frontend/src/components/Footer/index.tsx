import { Box, Grid2, Link, Stack, Typography } from "@mui/material";
import React from "react";
import * as styles from "./style.scss";
import { useTranslation } from "react-i18next";

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Grid2 container spacing={2} className={styles.container}>
      <Grid2 size={2.5} />
      <Grid2 size={4.5}>
        <Stack direction="row" spacing={1}>
          <Typography variant="subtitle2">{t("footer-copyright")}</Typography>
          <Typography variant="subtitle2">&#8226;</Typography>
          <Link
            className={styles.link}
            target="_blank"
            href="https://github.com/bryanluwz/website"
          >
            <Typography variant="subtitle2">{t("footer-sauce")}</Typography>
          </Link>
        </Stack>
      </Grid2>
      <Grid2 size={2}>
        <Stack direction="column" spacing={2}>
          <Typography variant="body2">{t("footer-links")}</Typography>
          <Stack direction="column" spacing={1}>
            <Link
              className={styles.link}
              target="_blank"
              href="https://www.linkedin.com/in/bryanluwz/"
            >
              <Typography variant="subtitle2">
                {t("footer-linkedin")}
              </Typography>
            </Link>
            <Link
              className={styles.link}
              target="_blank"
              href="https://github.com/bryanluwz"
            >
              <Typography variant="subtitle2">{t("footer-github")}</Typography>
            </Link>
            <Link
              className={styles.link}
              target="_blank"
              href="https://www.instagram.com/bryanluwezhern/"
            >
              <Typography variant="subtitle2">
                {t("footer-instagram")}
              </Typography>
            </Link>
            <Link
              className={styles.link}
              target="_blank"
              href="mailto:bryanlu.my@gmail.com"
            >
              <Typography variant="subtitle2">{t("footer-email")}</Typography>
            </Link>
            <Link className={styles.link}>
              <Typography variant="subtitle2">{t("footer-resume")}</Typography>
            </Link>
          </Stack>
        </Stack>
      </Grid2>
      <Grid2 size={2}>
        <Stack direction="column" spacing={2}>
          <Typography variant="body2">{t("footer-message")}</Typography>
          <Stack direction={"column"} spacing={1}>
            <Link className={styles.link}>
              <Typography variant="subtitle2">{t("footer-chat")}</Typography>
            </Link>
          </Stack>
        </Stack>
      </Grid2>
      <Grid2 size={1} />
    </Grid2>
  );
};
