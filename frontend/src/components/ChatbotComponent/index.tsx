import React from "react";
import { Box, IconButton, Stack } from "@mui/material";
import { CustomTypography } from "../CustomTypography";

import { useTranslation } from "react-i18next";
import { useNavigationStore } from "../../redux/features/Navigation/hooks";
import { useChatbotStore } from "../../redux/features/Chatbot/hooks";

import * as styles from "./style.scss";
import { ChatbotRoleEnum } from "../../apis/enums";

interface ChatbotComponentProps {
  isOpen: boolean;
}

export const ChatbotComponent: React.FC<ChatbotComponentProps> = ({
  isOpen,
}) => {
  const { t, i18n } = useTranslation();
  const { toggleChatbot } = useNavigationStore();
  const { messages, addChatbotMessage } = useChatbotStore();

  React.useEffect(() => {
    if (messages.length > 0) {
      return;
    }
    // Add a default message when the component mounts
    const defaultMessage = {
      role: ChatbotRoleEnum.system,
      content: t("chatbot.defaultMessage"),
    };
    addChatbotMessage(defaultMessage.content, defaultMessage.role);
  }, [messages]);

  const messagesComponent = React.useMemo(() => {
    return messages.map((message, index) => {
      const isUserMessage = message.role === ChatbotRoleEnum.user;
      return (
        <Stack
          key={index}
          direction={"row"}
          sx={{
            justifyContent: isUserMessage ? "flex-end" : "flex-start",
            marginBottom: 1,
          }}
        >
          <CustomTypography variant="body1">{message.content}</CustomTypography>
        </Stack>
      );
    });
  }, [messages, i18n.language]);

  const chatboxComponent = React.useMemo(() => {
    if (!isOpen) return null;

    return (
      <Stack className={styles.container}>
        {/* Title of chat and also close button */}
        <Stack
          direction={"row"}
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <CustomTypography variant="h5">{t("contact.title")}</CustomTypography>
          <IconButton onClick={toggleChatbot}>Close</IconButton>
        </Stack>
        {/* Chatbot content (messages) goes here */}
        {messagesComponent}
        {/* Chat input (list of qns, input box, submit button) */}
        <Stack
          direction={"row"}
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
          spacing={2}
        >
          <Box>
            {/* hamburger menu to show pre set qns */}
            <IconButton onClick={() => {}}>Qns</IconButton>
            {/* Input box for user to type their question */}
            <input type="text" placeholder={t("chat.inputPlaceholder")} />
            {/* Submit button for user to send their question */}
            <IconButton
              onClick={() => {
                /* handle submit */
              }}
            >
              Send
            </IconButton>
          </Box>
        </Stack>
      </Stack>
    );
  }, [isOpen, i18n.language, messages]);

  return <>{chatboxComponent}</>;
};

export default ChatbotComponent;
