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
  backgroundColor = "var(--secondary-background-color)",
  content = [],
  image,
}) => {
  const { t, i18n } = useTranslation();

  const [isPopupCardOpen, setIsPopupCardOpen] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement | null>(null);
  const [isCardHovered, setIsCardHovered] = React.useState(false);

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
        minHeight: "calc(100% - 6rem)",
        height: "auto",
        zIndex: 201,
      });
      setTimeout(() => {
        cardRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }, 500);
    } else {
      setCardAnimateStyle(null);
    }
  };

  React.useEffect(() => {
    updateCardAnimateStyle();
  }, [isPopupCardOpen, i18n.language]);

  const contentComponent = React.useMemo(() => {
    return (
      <>
        {isPopupCardOpen &&
          content.map((item, index) => (
            <Stack key={index} direction={"column"}>
              <Typography key={index} variant="h5">
                {item.contentTitle}
              </Typography>
              {item.contentBody?.map((content, _index) => (
                <Typography key={_index} variant="subtitle1">
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
      </>
    );
  }, [i18n.language, isPopupCardOpen, content]);

  return (
    <>
      {/* Card that transforms into the Popup */}
      <Box className={styles.cardWrapper}>
        {image && !isPopupCardOpen && (
          <Box
            className={styles.cardImageContainer}
            sx={
              isCardHovered
                ? {
                    transform: "translateY(0px) scale(1.02)",
                  }
                : {}
            }
          >
            <motion.img
              className={styles.cardImage}
              initial={{ transform: "translateY(0px) scale(1.0)" }}
              animate={
                isCardHovered
                  ? { transform: "translateY(10px) scale(1.02)" }
                  : { transform: "translateY(0px) scale(1.0)" }
              }
              transition={{ duration: 0.3 }}
              src={image}
            />
          </Box>
        )}
        <motion.div
          ref={cardRef}
          style={{ backgroundColor }}
          className={cx(styles.cardContainer, {
            [styles.link]: !isPopupCardOpen,
          })}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 22,
            duration: 0.3,
          }}
          initial={{ transform: "scale(1)" }}
          animate={cardAnimateStyle ?? { transform: "scale(1)" }}
          onClick={handleOpenPopupCard}
          onHoverStart={() => setIsCardHovered(true)}
          onHoverEnd={() => setIsCardHovered(false)}
          whileHover={
            !isPopupCardOpen
              ? {
                  transform: "scale(1.02)",
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
              {contentComponent}
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
