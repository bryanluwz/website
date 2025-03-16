import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PagesEnum } from "../../../apis/enums";
import { useNavigate } from "react-router";

// Define the state interface
interface NavigationState {
  currentRoute: PagesEnum;
}

const initialState: NavigationState = {
  currentRoute: PagesEnum["Home"],
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
