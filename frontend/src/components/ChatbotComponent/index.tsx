import React from "react";
import cx from "classnames";
import { useTranslation } from "react-i18next";
import { useNavigationStore } from "../../redux/features/Navigation/hooks";
import { useChatbotStore } from "../../redux/features/Chatbot/hooks";

import {
  Box,
  CircularProgress,
  FilledInput,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
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
  const { messages, addChatbotMessage, isLoading, postChatbotMessage } =
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

  const handleSubmitWithValue = async (value: string) => {
    const currentMessages = messages;
    const newMessages = [
      ...currentMessages,
      { role: ChatbotRoleEnum.user, content: value },
    ];
    addChatbotMessage(value, ChatbotRoleEnum.user);
    const response = await postChatbotMessage(newMessages);

    if (response) {
      const botResponse = response;
      addChatbotMessage(botResponse, ChatbotRoleEnum.system);
    } else {
      const errorMessage = t("chatbot.error-message");
      addChatbotMessage(errorMessage, ChatbotRoleEnum.system);
    }
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
            direction={"column"}
            spacing={2}
            sx={{
              justifyContent: isUserMessage ? "flex-end" : "flex-start",
              marginBottom: 1,
            }}
          >
            <CustomTypography
              variant="caption"
              parseLinks={{
                parseLinks: true,
                addLinkIcon: false,
                linkProps: {
                  onClick: (e) => e.stopPropagation(),
                },
              }}
              sx={{
                wordBreak: "break-word",
              }}
            >
              {message.content.split("\n")}
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

    // Loading icon when loading
    const loadingComponent = isLoading ? (
      <CircularProgress
        size={20}
        className={styles.loadingIcon}
        disableShrink
      />
    ) : null;

    return (
      <Stack className={styles.content} spacing={1}>
        {individualMessageList}
        {presetQuestionsComponent}
        {/* Scroll to bottom div */}
        {loadingComponent}
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
            maxHeight: "6rem",
            overflowY: "auto",
            textarea: {
              // Taken from theme.ts
              color:
                "var(--primary-font-color-dark, var(--primary-font-color))",
              fontSize: "clamp(0.8rem, .8rem + .5vw, 1rem)",
              fontWeight: 400,
            },
          }}
          multiline
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
        <IconButton
          disabled={isLoading || inputValue.length === 0}
          onClick={handleInputSubmit}
        >
          <ArrowUpwardIcon />
        </IconButton>
      </Stack>
    );
  }, [inputValue, isLoading, i18n.language]);

  const chatboxComponent = React.useMemo(() => {
    if (!isOpen) return null;

    return (
      <Stack className={styles.container}>
        {/* Title of chat and also close button */}
        {headerComponent}
        {/* Chatbot content (messages) goes here */}
        {messagesComponent}
        {/* Chat input (list of qns, input box, submit button) */}
        {inputComponent}
      </Stack>
    );
  }, [isOpen, i18n.language, messages, inputValue]);

  return <>{chatboxComponent}</>;
};

export default ChatbotComponent;
