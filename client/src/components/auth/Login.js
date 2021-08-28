import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ErrorNotice from "../../components/notifications/ErrorNotice";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const { setCurrentUserData } = useContext(CurrentUserContext);
  const history = useHistory();

  const submit = async (e) => {
    console.log("[LOGIN] Submit!");
    e.preventDefault();
    try {
      const loginUser = { email, password };
      console.log("--- Attempting to log in user ", loginUser);
      const loginResponse = await axios.post("/api/users/login", loginUser);
      console.log("--- User logged in!");
      console.log(
        "--- Setting currentUserData and localStorage from loginResponse: ",
        loginResponse
      );
      setCurrentUserData({
        token: loginResponse.data.token,
        user: loginResponse.data.user,
      });
      localStorage.setItem("auth-token", loginResponse.data.token);
      console.log("--- localStorage: ", localStorage);
      console.log("--- rerouting successfully logged in user home");
      history.push("/");
    } catch (err) {
      if (err.response) {
        console.log("--- ERROR: ", err.response.data);
        err.response.data.msg && setError(err.response.data.msg);
      } else {
        console.log("--- ERROR ", err);
      }
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form onSubmit={submit}>
        <label>Email: </label>
        <input
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password: </label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="Login" className="btn btn-primary" />
      </form>
    </div>
  );
}

export default Login;
