import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "./features/Navigation";
import mainPageReducer from "./features/MainPage";

export const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    mainPage: mainPageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
