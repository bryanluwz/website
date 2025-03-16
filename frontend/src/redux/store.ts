import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "./features/Navigation";

export const store = configureStore({
  reducer: {
    navigation: navigationReducer,
  },
});
