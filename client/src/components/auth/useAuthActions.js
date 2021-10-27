// import { useContext } from "react";
import { useHistory } from "react-router-dom";

import AuthService from "../../services/auth";
import useNotify from "../notifications/useNotify";

export default function useAuthActions() {
  const history = useHistory();
  const { notifySuccess } = useNotify();

  const register = (e) => history.push("/register");
  const login = (e) => history.push("/login");
  const logout = (e) => {
    AuthService.logout();
    notifySuccess({
      title: "Logged out",
      message: `You've been successfully logged out - cu soon ${
        AuthService.currentUser()?.user?.firstName
      }!`,
    });
    history.push("/");
  };

  // Helpers
  const currentUser = () => AuthService.currentUser();
  const userLoggedIn = () => AuthService.loggedIn();

  return { register, login, logout, userLoggedIn, currentUser };
}
