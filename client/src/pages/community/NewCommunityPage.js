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

export default function NewCommunityPage() {
  const { communities, setCommunities } = useContext(CommunitiesContext);
  const history = useHistory();

  const formMethods = useForm();
  const { handleSubmit } = formMethods;

  const onSubmit = (data) => {
    axios
      .post("api/communities", data)
      .then((res) => {
        setCommunities([res.data, ...communities]);
        // history.push("/");
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
      <FormProvider {...{ ...formMethods, ErrorMessage }}>
        <form
          id="newCommunity"
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
