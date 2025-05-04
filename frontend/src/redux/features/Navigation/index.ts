import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PagesEnum } from "../../../apis/enums";

// Define the state interface
interface NavigationState {
  currentRoute: PagesEnum | undefined;
  isChatbotOpen: boolean;
  isDarkMode: boolean;
}

const initialState: NavigationState = {
  currentRoute: undefined,
  isChatbotOpen: false,
  isDarkMode: false,
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setCurrentRoute: (state, action: PayloadAction<PagesEnum>) => {
      state.currentRoute = action.payload;
    },
    toggleChatbot: (state) => {
      state.isChatbotOpen = !state.isChatbotOpen;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
  },
});

export const { setCurrentRoute, toggleChatbot, setDarkMode } =
  navigationSlice.actions;
export default navigationSlice.reducer;
