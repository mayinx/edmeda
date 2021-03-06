import { useForm, FormProvider } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useContext } from "react";
import { useHistory } from "react-router";
import CommunitiesContext from "../../contexts/CommunitiesContext";
import FormConfig from "./FormConfig";
import TextInputFormGroup from "../../components/form/groups/TextInputFormGroup";
import SelectInputFormGroup from "../../components/form/groups/SelectInputFormGroup";

import useFormResultHandler from "../../components/form/useFormResultHandler";

import CommunityDataService from "../../services/community";

export default function NewCommunityPage(props) {
  const { communities, setCommunities } = useContext(CommunitiesContext);

  const history = useHistory();

  const formMethods = useForm();
  const {
    handleSubmit,
    formState: { errors },
    setError,
  } = formMethods;

  const { handleFormSuccess, handleFormError } = useFormResultHandler({
    modelName: "Community",
    crudAction: "create",
    setFieldError: setError,
  });

  const onSubmit = (data) => {
    CommunityDataService.create(data)
      .then((res) => {
        setCommunities([res.data, ...communities]);
        handleFormSuccess({ objectName: res?.data?.name });
        history.goBack();
      })
      .catch((err) => {
        handleFormError({ errorObject: err });
      });
  };

  return (
    <div className="ModalPage__body--inner   CommunityModalPage NewCommunityPage">
      <FormProvider {...{ ...formMethods, ErrorMessage, errors }}>
        <form
          id={props.formId}
          className="Form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextInputFormGroup name="name" formConfig={FormConfig.name} />
          <SelectInputFormGroup name="type" formConfig={FormConfig.type} />
          <SelectInputFormGroup name="grade" formConfig={FormConfig.grade} />
          {/* <TextInputFormGroup name="creator" formConfig={FormConfig.creator} /> */}
        </form>
      </FormProvider>
    </div>
  );
}
