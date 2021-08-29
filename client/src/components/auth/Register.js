import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import { useForm, FormProvider } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
// import "./Form.css";

import FormConfig from "./FormConfig";
import InputFormGroup from "../../components/form/groups/InputFormGroup";

export default function Register(props) {
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
  } = formMethods;

  const onSubmit = async (formData) => {
    console.log("[REGISTER] Submit!");
    try {
      console.log("--- yeah new user : ", formData);
      await axios.post("/api/users/register", formData);
      console.log("--- yeah new user registered");
      const loginResponse = await axios.post("/api/users/login", {
        email: formData.email,
        password: formData.password,
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
      history.push("/communities");
    } catch (err) {
      console.log(
        "Couldn't register user - something went wrong: ",
        err?.response?.data || err
      );
      // err.response.data.msg && setError(err.response.data.msg);
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
