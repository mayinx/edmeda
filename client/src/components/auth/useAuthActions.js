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
    // TODO:Swqap to first name
    const userFirstName = currentUserData?.user?.fullName;
    setCurrentUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
    notifySuccess({
      title: "Logged out",
      message: `You've been successfully logged out - cu soon ${
        userFirstName ?? null
      }!`,
    });
    history.push("/");
  };

  // TODO: Check at least presence of token as well
  // const userLoggedIn = currentUserData && currentUserData.user && currentUserData.token;
  const userLoggedIn = currentUserData && currentUserData.user ? true : false;

  return { userLoggedIn, currentUserData, register, login, logout };
}
