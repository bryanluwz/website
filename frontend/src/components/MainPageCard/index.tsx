import React from "react";
import { Box, Stack, Typography } from "@mui/material";

import * as styles from "./style.scss";
import cx from "classnames";

interface MainPageCardProps {
  title?: string;
  superTitle?: string; // if subtitle is under the title, then supertitle should be above right?
  backgroundColor?: string;
  content?: React.ReactNode | string;
}

enum CardMovementEnum {
  ORIGINAL_STATIC = "static",
  CENTER_STATIC = "center_static",
  MOVING_TO_CENTER = "moving_to_center",
  MOVING_BACK = "moving_back",
}

export const MainPageCard: React.FC<MainPageCardProps> = ({
  title = "Title",
  superTitle = "Super Title",
  backgroundColor = "#f0f0f0",
  content = "Content",
}) => {
  const [isPopupCardOpen, setIsPopupCardOpen] = React.useState<
    boolean | undefined
  >(undefined);
  const [isMoving, setIsMoving] = React.useState<CardMovementEnum>(
    CardMovementEnum.ORIGINAL_STATIC
  );
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [originalCardPosition, setOriginalCardPosition] = React.useState({
    top: 0,
    left: 0,
  });

  const calculateOriginalCardPosition = () => {
    if (cardRef.current) {
      const cardRect = cardRef.current.getBoundingClientRect();
      setOriginalCardPosition({
        top: cardRect.top,
        left: cardRect.left,
      });
    }
  };

  React.useEffect(() => {
    if (isPopupCardOpen === true) {
      calculateOriginalCardPosition();
      setIsMoving(CardMovementEnum.MOVING_TO_CENTER);
    } else if (isPopupCardOpen === false) {
      setIsMoving(CardMovementEnum.MOVING_BACK);
    }
  }, [isPopupCardOpen]);

  const handleBoxTransitionStyles = () => {
    switch (isMoving) {
      case CardMovementEnum.MOVING_TO_CENTER:
      case CardMovementEnum.CENTER_STATIC:
        return {
          position: "fixed",
          top: window.screenY + window.innerHeight / 2,
          left: window.screenX + window.innerWidth / 2,
          transform: "translate(-50%, -50%)",
        } as const;
      case CardMovementEnum.MOVING_BACK:
        return {
          position: "fixed",
          top: `${originalCardPosition.top}px`,
          left: `${originalCardPosition.left}px`,
        } as const;
      case CardMovementEnum.ORIGINAL_STATIC:
      default:
        return {} as const;
    }
  };

  const cardContent = React.useMemo(() => {
    if (!isPopupCardOpen) {
      return (
        <>
          <Typography variant="subtitle1">{superTitle}</Typography>
          <Typography variant="h2">{title}</Typography>
        </>
      );
    } else if (isPopupCardOpen) {
      return (
        <>
          <Typography variant="h2">{title}</Typography>
          <Typography variant="subtitle1">{superTitle}</Typography>
          <Typography variant="body1">{content}</Typography>
        </>
      );
    }
  }, [isPopupCardOpen, title, superTitle, content, isMoving]);

  return (
    <>
      {/* Card that transforms into the Popup */}
      <Box
        className={styles.cardWrapper}
        sx={handleBoxTransitionStyles()}
        onTransitionEnd={() => {
          if (isMoving === CardMovementEnum.MOVING_BACK) {
            setIsMoving(CardMovementEnum.ORIGINAL_STATIC);
          } else if (isMoving === CardMovementEnum.MOVING_TO_CENTER) {
            setIsMoving(CardMovementEnum.CENTER_STATIC);
          }
        }}
      >
        <Stack
          ref={cardRef}
          className={cx(styles.card, {
            [styles.link]: !isPopupCardOpen,
          })}
          sx={{ backgroundColor }}
          onMouseEnter={() => calculateOriginalCardPosition()}
          onClick={() => setIsPopupCardOpen(true)}
          spacing={0}
        >
          {cardContent}
        </Stack>
      </Box>

      {/* Popup Overlay */}
      <Box
        className={cx(styles.popupOverlay, {
          [styles.active]: isPopupCardOpen,
        })}
        onClick={() => setIsPopupCardOpen(false)}
      />
    </>
  );
};
