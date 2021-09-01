import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import CurrentUserContext from "../../contexts/CurrentUserContext";
// import ErrorNotice from "../../components/notifications/ErrorNotice";

import { useForm, FormProvider } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
// import "./Form.css";

import FormConfig from "./FormConfig";
import InputFormGroup from "../../components/form/groups/InputFormGroup";

import useNotify from "../notifications/useNotify";

export default function Login(props) {
  const { notifyError, notifySuccess } = useNotify();

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
      notifySuccess({
        title: "Login successfull",
        msg: "Welcome to Edmeda - happy socializing!",
      });
      history.push("/communities");
    } catch (err) {
      const errMsg = err?.response?.data?.msg ?? err;
      console.log(
        "Couldn't login user - something went wrong: ",
        err?.response?.data || err
      );
      notifyError({
        title: "Login failed",
        msg: `Couldn't login user: ${errMsg}`,
        toastCntId: "modalNotificationCnt",
      });
    }
  };

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
      </FormProvider>
    </div>
  );
}
