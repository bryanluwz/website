import { useDispatch, useSelector } from "react-redux";
import { setCurrentRoute, toggleChatbot, setDarkMode } from ".";
import { PagesEnum } from "../../../apis/enums";
import { RootState } from "../../store";

export const useNavigationStore = () => {
  const dispatch = useDispatch();
  const currentRoute = useSelector(
    (state: RootState) => state.navigation.currentRoute
  );
  const isChatbotOpen = useSelector(
    (state: RootState) => state.navigation.isChatbotOpen
  );
  const isDarkMode = useSelector(
    (state: RootState) => state.navigation.isDarkMode
  );
  return {
    currentRoute,
    isChatbotOpen,
    isDarkMode,
    setCurrentRoute: (route: PagesEnum) => dispatch(setCurrentRoute(route)),
    toggleChatbot: () => dispatch(toggleChatbot()),
    setDarkMode: (isDarkMode: boolean) => dispatch(setDarkMode(isDarkMode)),
  };
};
