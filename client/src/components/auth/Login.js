import { useHistory } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import FormConfig from "./FormConfig";
import InputFormGroup from "../../components/form/groups/InputFormGroup";
import useNotify from "../notifications/useNotify";
import useFormResultHandler from "../form/useFormResultHandler";
import AuthService from "../../services/auth";
import "./Login.css";

export default function Login(props) {
  const { notifySuccess } = useNotify();

  const history = useHistory();

  const formMethods = useForm();
  const {
    handleSubmit,
    formState: { errors },
    setError,
  } = formMethods;

  const { handleFormError } = useFormResultHandler({
    modelName: "User",
    crudAction: "read",
    setFieldError: setError,
  });

  const onSubmit = async (formData) => {
    // // e.preventDefault();
    try {
      const response = await AuthService.login(formData);

      notifySuccess({
        title: "Login successfull",
        message: `Welcome to Edmeda, ${response?.data?.user?.firstName} - happy socializing!`,
      });
      history.push("/communities");
    } catch (err) {
      handleFormError({
        errorObject: err,
        title: "Login failed",
        message: `Couldn't login user: ${err?.response?.data?.msg ?? err}`,
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
          <div className="DemoInfo">
            <h2>Demo-login</h2>
            <p>Use the following credentials to give Edmeda a try:</p>
            <p className="DemoCrendentialsEntry">E-Mail: chuck@nerdherd.com</p>
            <p className="DemoCrendentialsEntry">PW: Chuck99</p>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
