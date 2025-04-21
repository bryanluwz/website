import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "./features/Navigation";
import chatbotReducer from "./features/Chatbot";

export const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    chatbot: chatbotReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
