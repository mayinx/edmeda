import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function AuthOptions() {
  const { currentUserData, setCurrentUserData } = useContext(
    CurrentUserContext
  );
  const history = useHistory();

  const register = () => history.push("/register");
  const login = () => history.push("/login");
  const logout = () => {
    setCurrentUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };

  console.log("[Appheader] currentUserData: ", currentUserData);
  console.log("[Appheader] currentUserData.user: ", currentUserData.user);

  return (
    <nav className="auth-options">
      {currentUserData.user ? (
        <button className="btn green" onClick={logout}>
          Logout
        </button>
      ) : (
        <>
          <button className="btn green" onClick={register}>
            Sign Up
          </button>
          <button className="btn green" onClick={login}>
            Login
          </button>
        </>
      )}
    </nav>
  );
}

export default AuthOptions;
