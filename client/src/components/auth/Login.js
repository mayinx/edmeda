import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ErrorNotice from "../../components/notifications/ErrorNotice";

import { useForm, FormProvider } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
// import "./Form.css";

import FormConfig from "./FormConfig";
import InputFormGroup from "../../components/form/groups/InputFormGroup";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login(props) {
  const toastOptions = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const notifyUserLoggedIn = () =>
    toast.success(
      <div>
        <h3>Login successfull</h3>
        <div>Welcome to Edmeda - happy socializing</div>
      </div>,
      toastOptions
    );

  const notifyError = (title, msg) =>
    toast.error(
      <div>
        <h3>{title}</h3>
        <div>{msg}</div>
      </div>,
      toastOptions
    );

  // const notify = (msg) => toast(msg);

  // notify("Couldn't login user");
  const { setCurrentUserData } = useContext(CurrentUserContext);
  const history = useHistory();

  const formMethods = useForm();
  const {
    getValues,
    handleSubmit,
    formState: { errors },
  } = formMethods;

  const onSubmit = async (formData) => {
    console.log("[LOGIN] Submit!");
    // e.preventDefault();
    try {
      // const formData = { email, password };
      console.log("--- Attempting to log in user ", formData);
      const loginResponse = await axios.post("/api/users/login", formData);
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
      notifyUserLoggedIn();
      history.push("/communities");
    } catch (err) {
      const errMsg = err?.response?.data?.msg ?? err;
      console.log(
        "Couldn't login user - something went wrong: ",
        err?.response?.data || err
      );
      notifyError("Login failed", `Couldn't login user: ${errMsg}`);
    }
  };

  // const submit = async (e) => {
  //   console.log("[LOGIN] Submit!");
  //   e.preventDefault();
  //   try {
  //     const formData = { email, password };
  //     console.log("--- Attempting to log in user ", formData);
  //     const loginResponse = await axios.post("/api/users/login", formData);
  //     console.log("--- User logged in!");
  //     console.log(
  //       "--- Setting currentUserData and localStorage from loginResponse: ",
  //       loginResponse
  //     );
  //     setCurrentUserData({
  //       token: loginResponse.data.token,
  //       user: loginResponse.data.user,
  //     });
  //     localStorage.setItem("auth-token", loginResponse.data.token);
  //     console.log("--- localStorage: ", localStorage);
  //     console.log("--- rerouting successfully logged in user home");
  //     history.push("/");
  //   } catch (err) {
  //     if (err.response) {
  //       console.log("--- ERROR: ", err.response.data);
  //       err.response.data.msg && setError(err.response.data.msg);
  //     } else {
  //       console.log("--- ERROR ", err);
  //     }
  //   }
  // };

  return (
    <div className="ModalPage__bodyInner CommunityModalFormPage NewCommunityModalFormPage">
      <FormProvider {...{ ...formMethods, ErrorMessage, errors }}>
        <form
          id={props.formId}
          className="Form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputFormGroup name="email" formConfig={FormConfig.login.email} />

          <InputFormGroup
            name="password"
            formConfig={FormConfig.login.password}
          />
        </form>
        {/* <ToastContainer /> */}
      </FormProvider>
    </div>

    // <div className="login">
    //   <h2>Login</h2>
    //   {error && (
    //     <ErrorNotice message={error} clearError={() => setError(undefined)} />
    //   )}
    //   <form onSubmit={submit}>
    //     <label>Email: </label>
    //     <input
    //       type="email"
    //       id="email"
    //       onChange={(e) => setEmail(e.target.value)}
    //     />
    //     <label>Password: </label>
    //     <input
    //       type="password"
    //       id="password"
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //     <input type="submit" value="Login" className="btn btn-primary" />
    //   </form>
    // </div>
  );
}
