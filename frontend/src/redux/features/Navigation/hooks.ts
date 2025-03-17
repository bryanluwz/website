import { useDispatch, useSelector } from "react-redux";
import { setCurrentRoute } from ".";
import { PagesEnum } from "../../../apis/enums";

export const useNavigationStore = () => {
  const dispatch = useDispatch();
  const currentRoute = useSelector(
    (state: any) => state.navigation.currentRoute
  );
  return {
    currentRoute,
    setCurrentRoute: (route: PagesEnum) => dispatch(setCurrentRoute(route)),
  };
};
