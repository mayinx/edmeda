import { useForm, FormProvider } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import "./Form.css";
import axios from "axios";
import { useContext } from "react";
import { useHistory } from "react-router";
import CommunitiesContext from "../../contexts/CommunitiesContext";
import FormConfig from "./FormConfig";
import TextInputFormGroup from "../../components/form/groups/TextInputFormGroup";
import SelectInputFormGroup from "../../components/form/groups/SelectInputFormGroup";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function NewCommunityPage(props) {
  const { communities, setCommunities } = useContext(CommunitiesContext);
  const { currentUserData, setCurrentUserData } = useContext(
    CurrentUserContext
  );

  const history = useHistory();

  const formMethods = useForm();
  const {
    handleSubmit,
    formState: { errors },
  } = formMethods;

  const onSubmit = (data) => {
    axios
      .post("/api/communities", data, {
        headers: { "x-auth-token": currentUserData.token },
      })
      .then((res) => {
        setCommunities([res.data, ...communities]);
        history.goBack();
      })
      .catch((err) => {
        console.log(
          "Couldn't create a new community - something went wrong: ",
          err
        );
      });
  };

  return (
    <div className="ModalPage__bodyInner CommunityModalFormPage NewCommunityModalFormPage">
      <FormProvider {...{ ...formMethods, ErrorMessage, errors }}>
        <form
          id={props.formId}
          className="Form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextInputFormGroup
            name="name"
            formConfig={FormConfig.name}
            label="Class Community Name"
            placeholder="E.g. 'Class Community 3a'"
          />

          <SelectInputFormGroup
            name="grade"
            formConfig={FormConfig.grade}
            options={FormConfig.gradeOptionsForSelect}
          />

          <TextInputFormGroup name="creator" formConfig={FormConfig.creator} />
        </form>
      </FormProvider>
    </div>
  );
}
