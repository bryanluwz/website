import { useDispatch, useSelector } from "react-redux";
import { getMainPageCards } from ".";
import { RootState } from "../../store";

export const useMainPageStore = () => {
  const dispatch = useDispatch();
  const mainPageCards = useSelector(
    (state: RootState) => state.mainPage.mainPageCards
  );
  return {
    mainPageCards,
    getMainPageCards: () => dispatch(getMainPageCards()),
  };
};
