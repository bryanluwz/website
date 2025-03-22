import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PagesEnum } from "../../../apis/enums";

// Define the state interface
interface NavigationState {
  currentRoute: PagesEnum | undefined;
}

const initialState: NavigationState = {
  currentRoute: undefined,
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setCurrentRoute: (state, action: PayloadAction<PagesEnum>) => {
      state.currentRoute = action.payload;
    },
  },
});

export const { setCurrentRoute } = navigationSlice.actions;
export default navigationSlice.reducer;
