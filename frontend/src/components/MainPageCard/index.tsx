import React from "react";
import { Box, Stack, Typography } from "@mui/material";

import * as styles from "./style.scss";
import cx from "classnames";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { MainPageCardContentModel } from "../../apis/MainPage/typings";

interface MainPageCardProps {
  title?: string;
  superTitle?: string; // if subtitle is under the title, then supertitle should be above right?
  backgroundColor?: string;
  image?: string;
  content?: MainPageCardContentModel[];
}

export const MainPageCard: React.FC<MainPageCardProps> = ({
  title = "Title",
  superTitle = "Super Title",
  backgroundColor = "#f0f0f0",
  content = [],
}) => {
  const { t, i18n } = useTranslation();

  const [isPopupCardOpen, setIsPopupCardOpen] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement | null>(null);

  const handleOpenPopupCard = () => {
    setIsPopupCardOpen(true);
  };

  const handleClosePopupCard = () => {
    setIsPopupCardOpen(false);
  };

  const [cardAnimateStyle, setCardAnimateStyle] = React.useState<{
    [key: string]: string | number;
  } | null>(null);

  const updateCardAnimateStyle = () => {
    if (!cardRef.current) return;

    if (isPopupCardOpen) {
      setCardAnimateStyle({
        height: "auto",
        zIndex: 201,
      });
      setTimeout(() => {
        cardRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }, 400);
    } else {
      setCardAnimateStyle(null);
    }
  };

  React.useEffect(() => {
    updateCardAnimateStyle();
  }, [isPopupCardOpen, i18n.language]);

  return (
    <>
      {/* Card that transforms into the Popup */}
      <Box className={styles.cardWrapper}>
        <motion.div
          ref={cardRef}
          className={cx(styles.cardContainer, {
            [styles.link]: !isPopupCardOpen,
          })}
          style={{ backgroundColor }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
          initial={{ transform: "scale(1)" }}
          animate={cardAnimateStyle ?? { transform: "scale(1)" }}
          onClick={handleOpenPopupCard}
          whileHover={
            !isPopupCardOpen
              ? {
                  transform: "scale(1.05)",
                  boxShadow: "0px 50px 100px -20px rgba(0, 0, 0, 0.15)",
                }
              : {}
          }
        >
          <Stack
            className={cx(styles.card, {
              [styles.focused]: isPopupCardOpen,
            })}
            onClick={() => setIsPopupCardOpen(true)}
            spacing={2}
          >
            <Stack direction={"column"} spacing={0}>
              <Typography variant="subtitle1">{superTitle}</Typography>
              <Typography variant="h3">{title}</Typography>
            </Stack>
            <Stack direction={"column"} spacing={2}>
              {isPopupCardOpen &&
                content.map((item, index) => (
                  <Stack direction={"column"}>
                    <Typography key={index} variant="h5">
                      {item.contentTitle}
                    </Typography>
                    {item.contentBody.map((content, index) => (
                      <Typography key={index} variant="subtitle1">
                        {content}
                      </Typography>
                    ))}
                  </Stack>
                ))}
              {isPopupCardOpen && content.length === 0 && (
                <Typography variant="subtitle1">
                  {t("main-page-card-no-content")}
                </Typography>
              )}
            </Stack>
          </Stack>
        </motion.div>
      </Box>

      {/* Popup Overlay */}
      <Box
        className={cx(styles.popupOverlay, {
          [styles.active]: isPopupCardOpen,
        })}
        onClick={handleClosePopupCard}
      />
    </>
  );
};
