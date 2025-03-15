import React, { ReactNode } from "react";
import { UserInfoModel } from "../apis/ChatPage/typings";
import { authUserApi, loginApi } from "../apis/Auth";
import { useChatPageStore } from "../zustand/apis/ChatPage";
import { useDashboardStore } from "../zustand/apis/Dashboard";

// Define types for the authentication state and context
interface AuthState {
  token: string | null;
  user: UserInfoModel | null;
  loading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextProps {
  auth: AuthState;
  login: (token: string, user: UserInfoModel) => void;
  logout: () => void;
}

// Create Context
export const AuthContext = React.createContext<AuthContextProps>({
  auth: {
    token: null,
    user: null,
    loading: true,
  },
  login: () => {},
  logout: () => {},
});

// Provider Component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = React.useState<AuthState>({
    token: localStorage.getItem("token"),
    user: null,
    loading: true,
  });

  const { clearUserInfo } = useChatPageStore();
  const { clearUserList } = useDashboardStore();

  React.useEffect(() => {
    const loadUser = async () => {
      if (auth.token) {
        try {
          const res = await authUserApi(auth.token);
          setAuth({
            token: res.data.token,
            user: res.data.user,
            loading: false,
          });
        } catch (err) {
          console.error(err);
          setAuth({ token: null, user: null, loading: false });
          localStorage.removeItem("token");
        }
      } else {
        setAuth({ token: null, user: null, loading: false });
      }
    };

    loadUser();
  }, []);

  const login = (token: string, user: UserInfoModel) => {
    localStorage.setItem("token", token);
    setAuth({ token: token, user: user, loading: false });
  };

  const logout = () => {
    localStorage.removeItem("token");
    clearUserInfo();
    clearUserList();
    setAuth({ token: null, user: null, loading: false });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
