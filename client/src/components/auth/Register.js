import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import CurrentUserContext from "../../contexts/CurrentUserContext";

import { useForm, FormProvider } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import FormConfig from "./FormConfig";
import InputFormGroup from "../../components/form/groups/InputFormGroup";
import useNotify from "../notifications/useNotify";
import useFormResultHandler from "../form/useFormResultHandler";

import AuthService from "../../services/auth";

export default function Register(props) {
  const { notifyError, notifySuccess } = useNotify();

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
    try {
      let response = await AuthService.register(formData);
      response = await AuthService.login(formData, setCurrentUserData);

      notifySuccess({
        title: "Registration successfull",
        message: `Welcome to Edmeda, ${response?.data?.user?.firstName} - happy socializing!`,
      });
      history.push("/communities");
    } catch (err) {
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
