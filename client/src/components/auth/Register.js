import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ErrorNotice from "../../components/notifications/ErrorNotice";

function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [fullName, setFullName] = useState();
  const [error, setError] = useState();

  const { setCurrentUserData } = useContext(CurrentUserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    console.log("[REGISTER] Submit!");

    try {
      const newUser = {
        email,
        password,
        passwordCheck,
        fullName,
        type: "teacher",
      };
      console.log("--- yeah new user : ", newUser);
      await axios.post("/api/users/register", newUser);
      console.log("--- yeah new user registered");
      const loginResponse = await axios.post("/api/users/login", {
        email: newUser.email,
        password: newUser.password,
      });
      console.log(
        "--- yeah new user logged in - loginResponse: ",
        loginResponse
      );
      setCurrentUserData({
        token: loginResponse.data.token,
        user: loginResponse.data.user,
      });
      localStorage.setItem("auth-token", loginResponse.data.token);
      console.log("--- yeah localStorage set! LocalStorage: ", localStorage);
      console.log(
        "--- Rerouting successfully registred and logged in users to home..."
      );
      history.push("/");
    } catch (err) {
      console.log(
        "--- SOME ERROR - PROPABLY SERVER ERROR: ",
        err.response.data
      );
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div className="register">
      <h2>Register</h2>
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
        <input
          type="password"
          placeholder="Confirm password"
          onChange={(e) => setPasswordCheck(e.target.value)}
        />
        <label>Full Name </label>
        <input
          type="text"
          id="dsplay-name"
          onChange={(e) => setFullName(e.target.value)}
        />
        <input type="submit" value="Register" className="btn btn-primary" />
      </form>
    </div>
  );
}

export default Register;
