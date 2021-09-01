import { useContext } from "react";
import { useHistory } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import useNotify from "../notifications/useNotify";

export default function useAuthActions() {
  const { currentUserData, setCurrentUserData } = useContext(
    CurrentUserContext
  );
  const history = useHistory();
  const { notifyError, notifySuccess } = useNotify();

  const register = (e) => history.push("/register");
  const login = (e) => history.push("/login");
  const logout = (e) => {
    console.log("currentUserData", currentUserData);
    const userName = currentUserData?.user?.userName;
    setCurrentUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
    notifySuccess({
      title: "Logged out",
      msg: `You've been successfully logged out - cu soon ${userName ?? null}!`,
    });
    history.push("/");
  };

  // TODO: Check at least presence of token as well
  // const userLoggedIn = currentUserData && currentUserData.user && currentUserData.token;
  const userLoggedIn = currentUserData && currentUserData.user ? true : false;

  return { userLoggedIn, register, login, logout };
}
