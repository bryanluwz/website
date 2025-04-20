import React from "react";
import { Box, IconButton, Stack, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { CustomTypography } from "../CustomTypography";

import { useTranslation } from "react-i18next";
import { useNavigationStore } from "../../redux/features/Navigation/hooks";
import { useChatbotStore } from "../../redux/features/Chatbot/hooks";
import cx from "classnames";

import { ChatbotRoleEnum } from "../../apis/enums";
import ChatbotAvatar from "../../../public/assets/mugshot_square.png";
import * as styles from "./style.scss";

interface ChatbotComponentProps {
  isOpen: boolean;
}

export const ChatbotComponent: React.FC<ChatbotComponentProps> = ({
  isOpen,
}) => {
  const { t, i18n } = useTranslation();
  const { toggleChatbot } = useNavigationStore();
  const { messages, addChatbotMessage, isLoading, setChatbotLoading } =
    useChatbotStore();

  const scrollToBottomRef = React.useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = React.useState<string>("");

  React.useEffect(() => {
    if (messages.length > 0) {
      scrollToBottomRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
      return;
    }
    // Add a default message when the component mounts
    const defaultMessage = {
      role: ChatbotRoleEnum.system,
      content: t("chatbot.defaultMessage"),
    };
    addChatbotMessage(defaultMessage.content, defaultMessage.role);
  }, [messages, isOpen, i18n.language]);

  const handleSubmit = () => {
    if (inputValue.trim() === "") return;
    addChatbotMessage(inputValue, ChatbotRoleEnum.user);
    setChatbotLoading(true);

    setInputValue("");
    setTimeout(() => {
      const responseMessage = {
        role: ChatbotRoleEnum.system,
        content: t("chatbot.dummy-response"),
      };
      addChatbotMessage(responseMessage.content, responseMessage.role);
      setChatbotLoading(false);
    }, 1000);
  };

  const messagesComponent = React.useMemo(() => {
    const individualMessageList = messages.map((message, index) => {
      const isUserMessage = message.role === ChatbotRoleEnum.user;
      return (
        <Stack
          className={cx(styles.messageBox, [
            {
              [styles.user]: isUserMessage,
            },
          ])}
          key={index}
          direction={"row"}
          sx={{
            justifyContent: isUserMessage ? "flex-end" : "flex-start",
            marginBottom: 1,
          }}
        >
          <CustomTypography variant="caption">
            {message.content}
          </CustomTypography>
        </Stack>
      );
    });
    return (
      <Stack className={styles.content} spacing={1}>
        {individualMessageList}
        <div ref={scrollToBottomRef} />
      </Stack>
    );
  }, [messages, i18n.language]);

  const chatboxComponent = React.useMemo(() => {
    if (!isOpen) return null;

    return (
      <Stack className={styles.container}>
        {/* Title of chat and also close button */}
        <Stack
          className={styles.header}
          direction={"row"}
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
          spacing={2}
        >
          <Box
            className={styles.image}
            component={"img"}
            src={ChatbotAvatar}
            alt="Chatbot"
          />
          <Stack className={styles.text}>
            <CustomTypography variant="h6">
              {t("chatbot.title")}
            </CustomTypography>
            <CustomTypography variant="body2">
              {t("chatbot.subtitle")}
            </CustomTypography>
          </Stack>
          <IconButton className={styles.icon} onClick={toggleChatbot}>
            <CloseIcon />
          </IconButton>
        </Stack>
        {/* Chatbot content (messages) goes here */}
        {messagesComponent}
        {/* Chat input (list of qns, input box, submit button) */}
        <Stack
          className={styles.inputBox}
          direction={"row"}
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
          spacing={1}
        >
          {/* hamburger menu to show pre set qns */}
          <IconButton disabled={isLoading} onClick={() => {}}>
            <MenuIcon />
          </IconButton>
          <TextField
            variant="standard"
            placeholder={t("chatbot.input-placeholder")}
            size="small"
            fullWidth
            sx={{
              input: {
                // Taken from theme.ts
                color:
                  "var(--primary-font-color-dark, var(--primary-font-color))",
                fontSize: "clamp(0.8rem, .8rem + .5vw, 1rem)",
                fontWeight: 400,
              },
            }}
            disabled={isLoading}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
          {/* Submit button for user to send their question */}
          <IconButton
            disabled={isLoading}
            onClick={() => {
              handleSubmit();
            }}
          >
            <ArrowUpwardIcon />
          </IconButton>
        </Stack>
      </Stack>
    );
  }, [isOpen, i18n.language, messages, inputValue]);

  return <>{chatboxComponent}</>;
};

export default ChatbotComponent;
