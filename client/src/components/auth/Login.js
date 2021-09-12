import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import { useForm, FormProvider } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import FormConfig from "./FormConfig";
import InputFormGroup from "../../components/form/groups/InputFormGroup";

import useNotify from "../notifications/useNotify";

export default function Login(props) {
  const { notifyError, notifySuccess } = useNotify();

  const { setCurrentUserData } = useContext(CurrentUserContext);
  const history = useHistory();

  const formMethods = useForm();
  const {
    getValues,
    handleSubmit,
    formState: { errors },
  } = formMethods;

  const onSubmit = async (formData) => {
    // e.preventDefault();
    try {
      const loginResponse = await axios.post("/api/users/login", formData);
      const userFirstName =
        loginResponse?.data?.user?.firstName ??
        loginResponse?.data?.user?.fullName;

      setCurrentUserData({
        token: loginResponse.data.token,
        user: loginResponse.data.user,
      });
      localStorage.setItem("auth-token", loginResponse.data.token);

      notifySuccess({
        title: "Login successfull",
        message: `Welcome to Edmeda, ${userFirstName} - happy socializing!`,
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
        message: `Couldn't login user: ${errMsg}`,
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
