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
    const userFirstName = AuthService.currentUser()?.user?.firstName;
    AuthService.logout();
    notifySuccess({
      title: "Logged out",
      message: `You've been successfully logged out - cu soon ${userFirstName}!`,
    });
    history.push("/");
  };

  // Helpers
  const currentUser = () => AuthService.currentUser();
  const userLoggedIn = () => AuthService.loggedIn();

  return { register, login, logout, userLoggedIn, currentUser };
}
