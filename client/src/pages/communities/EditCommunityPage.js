import { useForm, FormProvider } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import "./Form.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import CommunitiesContext from "../../contexts/CommunitiesContext";
import FormConfig from "./FormConfig";
import TextInputFormGroup from "../../components/form/groups/TextInputFormGroup";
import SelectInputFormGroup from "../../components/form/groups/SelectInputFormGroup";
import CurrentUserContext from "../../contexts/CurrentUserContext";
// import { reset } from "nodemon";

export default function EditCommunityPage(props) {
  const { communities, setCommunities } = useContext(CommunitiesContext);
  const history = useHistory();
  const { id } = useParams();
  const [community, setCommunity] = useState({});
  const formMethods = useForm();
  const {
    reset,
    handleSubmit,
    formState: { errors },
  } = formMethods;

  const { currentUserData, setCurrentUserData } = useContext(
    CurrentUserContext
  );

  useEffect(() => {
    axios
      .get(`/api/communities/${id}`, {
        headers: { "x-auth-token": currentUserData.token },
      })
      .then((res) => {
        setCommunity(res.data);
      })
      .catch((err) => {
        console.log("err: ", err);
        console.log("id:", id);
      });
  }, []);

  useEffect(() => {
    if (community) {
      reset(community);
    }
  }, [community]);

  const onSubmit = (data) => {
    axios
      .patch(`/api/communities/${id}`, data, {
        headers: { "x-auth-token": currentUserData.token },
      })
      .then((res) => {
        const newList = communities.map((el) => {
          if (el._id === id) {
            return { ...el, ...data };
          }

          return el;
        });

        setCommunities(newList);
        history.push("/");
      })
      .catch((err) => {
        console.log(
          `Couldn't update the community with the id '${id}' - something went wrong: `,
          err
        );
      });
  };

  return (
    <div className="ModalPage__bodyInner CommunityModalFormPage EditCommunityModalFormPage">
      <FormProvider {...{ ...formMethods, ErrorMessage, errors }}>
        <form
          id={props.formId}
          className="Form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextInputFormGroup
            name="name"
            formConfig={FormConfig.name}
            defaultValue={community?.name}
          />

          <SelectInputFormGroup
            name="grade"
            formConfig={FormConfig.grade}
            defaultValue={community?.grade}
          />

          <TextInputFormGroup
            name="creator"
            formConfig={FormConfig.creator}
            defaultValue={community?.creator}
          />
        </form>
      </FormProvider>
    </div>
  );
}
