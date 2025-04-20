import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PagesEnum } from "../../../apis/enums";

// Define the state interface
interface NavigationState {
  currentRoute: PagesEnum | undefined;
  isChatbotOpen: boolean;
}

const initialState: NavigationState = {
  currentRoute: undefined,
  isChatbotOpen: false,
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
  },
});

export const { setCurrentRoute, toggleChatbot } = navigationSlice.actions;
export default navigationSlice.reducer;
