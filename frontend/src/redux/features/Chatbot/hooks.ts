import { useDispatch, useSelector } from "react-redux";
import {
  addMessage,
  removeLastMessage,
  clearMessages,
  setLoading,
  setError,
} from ".";
import { ChatbotRoleEnum } from "../../../apis/enums";
import { RootState } from "../../store";

export const useChatbotStore = () => {
  const dispatch = useDispatch();

  const messages = useSelector((state: RootState) => state.chatbot.messages);
  const isLoading = useSelector((state: RootState) => state.chatbot.isLoading);
  const error = useSelector((state: RootState) => state.chatbot.error);

  const addChatbotMessage = (message: string, role: ChatbotRoleEnum) => {
    dispatch(addMessage({ role, content: message }));
  };
  const removeLastMessage = () => {
    dispatch(removeLastMessage());
  };
  const clearMessages = () => {
    dispatch(clearMessages());
  };
  const setChatbotLoading = (loading: boolean) => {
    dispatch(setLoading(loading));
  };
  const setChatbotError = (error: string | null) => {
    dispatch(setError(error));
  };

  return {
    messages,
    isLoading,
    error,
    addChatbotMessage,
    removeLastMessage,
    clearMessages,
    setChatbotLoading,
    setChatbotError,
  };
};
