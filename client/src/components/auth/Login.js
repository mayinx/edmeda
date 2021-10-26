import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import { useForm, FormProvider } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import FormConfig from "./FormConfig";
import InputFormGroup from "../../components/form/groups/InputFormGroup";

import useNotify from "../notifications/useNotify";

import AuthService from "../../services/auth";

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
    // // e.preventDefault();
    try {
      const response = await AuthService.login(formData, setCurrentUserData);

      notifySuccess({
        title: "Login successfull",
        message: `Welcome to Edmeda, ${response?.data?.user?.firstName} - happy socializing!`,
      });
      history.push("/communities");
    } catch (err) {
      console.log(
        "Couldn't login user - something went wrong: ",
        err?.response?.data || err
      );
      notifyError({
        title: "Login failed",
        message: `Couldn't login user: ${err?.response?.data?.msg ?? err}`,
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
