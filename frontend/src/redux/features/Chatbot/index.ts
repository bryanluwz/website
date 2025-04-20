import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatbotRoleEnum } from "../../../apis/enums";
import { ChatbotMessageModel } from "../../../apis/Chatbot/typings";

// Define the state interface
interface ChatbotState {
  messages: ChatbotMessageModel[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ChatbotState = {
  messages: [],
  isLoading: false,
  error: null,
};

const chatbotSlice = createSlice({
  name: "chatbot",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<ChatbotMessageModel>) => {
      state.messages.push(action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    postMessage: (state, action: PayloadAction<ChatbotMessageModel>) => {
      // Do something here
      // const response =
      // state.addMessage(response);
    },
  },
});

export const { addMessage, setLoading, setError } = chatbotSlice.actions;
export default chatbotSlice.reducer;
