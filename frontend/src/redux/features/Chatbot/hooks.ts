import { useDispatch, useSelector } from "react-redux";
import {
  addMessage,
  removeLastMessage as _removeLastMessage,
  clearMessages as _clearMessages,
  postMessage,
  setLoading,
  setError,
} from ".";
import { ChatbotRoleEnum } from "../../../apis/enums";
import { AppDispatch, RootState } from "../../store";
import { ChatbotMessageModel } from "../../../apis/Chatbot/typings";

export const useChatbotStore = () => {
  const dispatch = useDispatch<AppDispatch>();

  const messages = useSelector((state: RootState) => state.chatbot.messages);
  const isLoading = useSelector((state: RootState) => state.chatbot.isLoading);
  const error = useSelector((state: RootState) => state.chatbot.error);

  const addChatbotMessage = (message: string, role: ChatbotRoleEnum) => {
    dispatch(addMessage({ role, content: message }));
  };
  const removeLastMessage = () => {
    dispatch(_removeLastMessage());
  };
  const clearMessages = () => {
    dispatch(_clearMessages());
  };
  const setChatbotLoading = (loading: boolean) => {
    dispatch(setLoading(loading));
  };
  const setChatbotError = (error: string | null) => {
    dispatch(setError(error));
  };
  const postChatbotMessage = async (messages: ChatbotMessageModel[]) => {
    try {
      // The API endpoint is no longer free, chatbot halted until further notice
      throw Error("Error occured while sending message");
      const response = await dispatch(postMessage(messages)).unwrap();
      return response;
    } catch (err) {
      dispatch(setError("Error occurred while sending message"));
      return null;
    }
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
    postChatbotMessage,
  };
};
