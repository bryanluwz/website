import React from "react";
import cx from "classnames";
import { useTranslation } from "react-i18next";
import { useNavigationStore } from "../../redux/features/Navigation/hooks";
import { useChatbotStore } from "../../redux/features/Chatbot/hooks";

import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

import { CustomTypography } from "../CustomTypography";
import { FadeWrapper } from "../FadeWrapper";

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

  React.useEffect(() => {
    if (messages.length > 0) {
      scrollToBottomRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [messages, isOpen]);

  const handleInputSubmit = () => {
    if (inputValue.trim() === "") return;
    handleSubmitWithValue(inputValue);
    setInputValue("");
  };

  const handlePresetQuestionsSubmit = (value: string) => {
    handleSubmitWithValue(value);
  };

  const handleSubmitWithValue = (value: string) => {
    addChatbotMessage(value, ChatbotRoleEnum.user);
    setChatbotLoading(true);

    setTimeout(() => {
      const responseMessage = {
        role: ChatbotRoleEnum.system,
        content: t("chatbot.dummy-response"),
      };
      addChatbotMessage(responseMessage.content, responseMessage.role);
      setChatbotLoading(false);
    }, 1000);
  };

  // Header stuff
  const headerComponent = React.useMemo(() => {
    return (
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
          <CustomTypography variant="h6">{t("chatbot.title")}</CustomTypography>
          <CustomTypography variant="body2">
            {t("chatbot.subtitle")}
          </CustomTypography>
        </Stack>
        <IconButton className={styles.icon} onClick={toggleChatbot}>
          <CloseIcon />
        </IconButton>
      </Stack>
    );
  }, [isOpen, i18n.language]);

  // Messages stuff
  const messagesComponent = React.useMemo(() => {
    // Add a default message when message empty or only have one message (aka the default message)
    const defaultMessage = {
      role: ChatbotRoleEnum.system,
      content: t("chatbot.default-message"),
    };

    const extendedMessages = [defaultMessage, ...messages];

    const individualMessageList = extendedMessages.map((message, index) => {
      const isUserMessage = message.role === ChatbotRoleEnum.user;
      return (
        <FadeWrapper
          sx={{ display: "flex", flexDirection: "column" }}
          key={index}
        >
          <Stack
            className={cx(styles.messageBox, [
              {
                [styles.user]: isUserMessage,
              },
            ])}
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
        </FadeWrapper>
      );
    });

    // Preset questions for user to click on (only show when not loading)
    const presetQuestions = t("chatbot.preset-questions", {
      returnObjects: true,
    }) as string[];
    const presetQuestionsComponent = isLoading ? null : (
      <>
        {presetQuestions.map((question, index) => (
          <FadeWrapper key={index} delay={index * 0.1}>
            <Box className={cx(styles.messageBox, styles.preset)}>
              <CustomTypography
                variant="caption"
                onClick={() => handlePresetQuestionsSubmit(question)}
              >
                {question}
              </CustomTypography>
            </Box>
          </FadeWrapper>
        ))}
      </>
    );

    return (
      <Stack className={styles.content} spacing={1}>
        {individualMessageList}
        {presetQuestionsComponent}
        {/* Scroll to bottom div */}
        <div ref={scrollToBottomRef} />
      </Stack>
    );
  }, [messages, isLoading, i18n.language]);

  // Input stuff
  const [inputValue, setInputValue] = React.useState<string>("");

  const inputComponent = React.useMemo(() => {
    return (
      <Stack
        className={styles.inputBox}
        direction={"row"}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
        spacing={1}
      >
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
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleInputSubmit();
            }
          }}
        />
        {/* Submit button for user to send their question */}
        <IconButton disabled={isLoading} onClick={() => handleInputSubmit}>
          <ArrowUpwardIcon />
        </IconButton>
      </Stack>
    );
  }, [inputValue, isLoading, i18n.language]);

  const chatboxComponent = React.useMemo(() => {
    if (!isOpen) return null;

    return (
      <FadeWrapper>
        <Stack className={styles.container}>
          {/* Title of chat and also close button */}
          {headerComponent}
          {/* Chatbot content (messages) goes here */}
          {messagesComponent}
          {/* Chat input (list of qns, input box, submit button) */}
          {inputComponent}
        </Stack>
      </FadeWrapper>
    );
  }, [isOpen, i18n.language, messages, inputValue]);

  return <>{chatboxComponent}</>;
};

export default ChatbotComponent;
