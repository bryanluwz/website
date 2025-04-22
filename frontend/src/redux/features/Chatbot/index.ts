import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatbotMessageModel } from "../../../apis/Chatbot/typings";
import { chatbotApi } from "../../../apis/Chatbot";
import { checkStatus } from "../../../apis/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";

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
    removeLastMessage: (state) => {
      state.messages.pop();
    },
    clearMessages: (state) => {
      state.messages = [];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postMessage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(postMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        // use action.payload if needed
      })
      .addCase(postMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const postMessage = createAsyncThunk(
  "chatbot/postMessage",
  async (messages: ChatbotMessageModel[], { rejectWithValue }) => {
    try {
      const response = await chatbotApi({ messages });
      return checkStatus(response).data.response;
    } catch (err) {
      return rejectWithValue("Error occurred while sending message");
    }
  }
);

export const {
  addMessage,
  removeLastMessage,
  clearMessages,
  setLoading,
  setError,
} = chatbotSlice.actions;
export default chatbotSlice.reducer;
