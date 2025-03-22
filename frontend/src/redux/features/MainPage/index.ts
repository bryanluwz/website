import { createSlice } from "@reduxjs/toolkit";
import { PageCardModel } from "../../../apis/MainPage/typings";
import { mockMainPageCards } from "./mockdata";

// Define the state interface
interface MainPageState {
  mainPageCards: PageCardModel[];
}

const initialState: MainPageState = {
  mainPageCards: [],
};

const mainPageSlice = createSlice({
  name: "mainPage",
  initialState,
  reducers: {
    getMainPageCards: (state) => {
      // API call but no
      const mockdata = mockMainPageCards;
      state.mainPageCards = mockdata;
    },
  },
});

export const { getMainPageCards } = mainPageSlice.actions;
export default mainPageSlice.reducer;
