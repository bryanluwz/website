import { useDispatch, useSelector } from "react-redux";
import { setCurrentRoute, toggleChatbot } from ".";
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
  return {
    currentRoute,
    isChatbotOpen,
    setCurrentRoute: (route: PagesEnum) => dispatch(setCurrentRoute(route)),
    toggleChatbot: () => dispatch(toggleChatbot()),
  };
};
