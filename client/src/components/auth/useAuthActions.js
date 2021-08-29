import { useContext } from "react";
import { useHistory } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function useAuthActions() {
  const { currentUserData, setCurrentUserData } = useContext(
    CurrentUserContext
  );
  const history = useHistory();

  const register = (e) => history.push("/register");
  const login = (e) => history.push("/login");
  const logout = (e) => {
    setCurrentUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
    history.push("/");
  };

  // TODO: Check at least presence of token as well
  // const userLoggedIn = currentUserData && currentUserData.user && currentUserData.token;
  const userLoggedIn = currentUserData && currentUserData.user ? true : false;

  console.log("[Appheader/AuthActions] currentUserData: ", currentUserData);
  console.log(
    "[Appheader/AuthActions] currentUserData.user: ",
    currentUserData.user
  );

  return { userLoggedIn, register, login, logout };
}
