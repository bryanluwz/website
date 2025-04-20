import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatbotRoleEnum } from "../../../apis/enums";
import { ChatbotMessageModel } from "../../../apis/Chatbot/typings";

// Define the state interface
interface ChatbotState {
  messages: ChatbotMessageModel[];
  isLoading: boolean;
  error: string | null;
}

const deleteLater = [
  {
    role: ChatbotRoleEnum.user,
    content: "Hello",
  },
  {
    role: ChatbotRoleEnum.system,
    content:
      "The weather is sunny with a high of 25°C. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

const initialState: ChatbotState = {
  messages: deleteLater,
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
