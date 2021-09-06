import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import { useForm, FormProvider } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
// import "./Form.css";

import FormConfig from "./FormConfig";
import InputFormGroup from "../../components/form/groups/InputFormGroup";
import useNotify from "../notifications/useNotify";
import useFormResultHandler from "../form/useFormResultHandler";

export default function Register(props) {
  const { notifyError, notifySuccess } = useNotify();
  // const { communities, setCommunities } = useContext(CommunitiesContext);
  const { currentUserData, setCurrentUserData } = useContext(
    CurrentUserContext
  );

  const history = useHistory();

  const formMethods = useForm();
  const {
    getValues,
    handleSubmit,
    formState: { errors },
    setError,
  } = formMethods;

  const { handleFormSuccess, handleFormError } = useFormResultHandler({
    modelName: "User",
    crudAction: "create",
    setFieldError: setError,
  });

  const onSubmit = async (formData) => {
    console.log("[REGISTER] Submit!");
    try {
      await axios.post("/api/users/register", formData);

      const loginResponse = await axios.post("/api/users/login", {
        email: formData.email,
        password: formData.password,
      });
      const userFirstName =
        loginResponse?.data?.user?.firstName ??
        loginResponse?.data?.user?.fullName;
      setCurrentUserData({
        token: loginResponse.data.token,
        user: loginResponse.data.user,
      });
      localStorage.setItem("auth-token", loginResponse.data.token);

      notifySuccess({
        title: "Registration successfull",
        message: `Welcome to Edmeda, ${userFirstName} - happy socializing!`,
      });
      history.push("/communities");
    } catch (err) {
      // err.response.data.msg && setError(err.response.data.msg);
      // const errMsg = err?.response?.data?.msg ?? err;
      // console.log(
      //   "Couldn't register user - something went wrong: ",
      //   err?.response?.data || err
      // );
      // notifyError({
      //   title: "Registration failed",
      //   message: `Couldn't register user: ${errMsg}`,
      //   toastCntId: "modalNotificationCnt",
      // });

      handleFormError({
        errorObject: err,
        title: "Registration failed",
        message:
          "Couldn't create Edmeda-Account - an unexpected error occured.",
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
          {/* <InputFormGroup
            name="schoolName"
            formConfig={FormConfig.schoolName}
          />
          <InputFormGroup
            name="schoolType"
            formConfig={FormConfig.schoolType}
          /> */}
          <InputFormGroup name="fullName" formConfig={FormConfig.fullName} />
          <InputFormGroup name="email" formConfig={FormConfig.email} />
          <InputFormGroup name="password" formConfig={FormConfig.password} />

          <InputFormGroup
            name="passwordConfirmation"
            formConfig={FormConfig.passwordConfirmation}
            validationRuleset={{
              ...FormConfig.passwordConfirmation.validationRuleset,
              validate: {
                passwordEqual: (value) =>
                  value === getValues().password ||
                  FormConfig.password.valdiationMsgPasswordRequired,
              },
            }}
          />
        </form>
      </FormProvider>
    </div>
  );
}
