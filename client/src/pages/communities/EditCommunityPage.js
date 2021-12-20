import { useForm, FormProvider } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import CommunitiesContext from "../../contexts/CommunitiesContext";
import FormConfig from "./FormConfig";
import TextInputFormGroup from "../../components/form/groups/TextInputFormGroup";
import SelectInputFormGroup from "../../components/form/groups/SelectInputFormGroup";

import useNotify from "../../components/notifications/useNotify";
import useFormResultHandler from "../../components/form/useFormResultHandler";
import CommunityDataService from "../../services/community";
import ModalContext from "../../contexts/ModalContext";

export default function EditCommunityPage(props) {
  const { communities, setCommunities } = useContext(CommunitiesContext);
  const history = useHistory();
  const { notifyError } = useNotify();
  const { id } = useParams();
  const [community, setCommunity] = useState({});
  const [communityLoaded, setCommunityLoaded] = useState(false);
  const { setModalCaption } = useContext(ModalContext);
  const formMethods = useForm();
  const {
    reset,
    handleSubmit,
    formState: { errors },
    setError,
  } = formMethods;

  const { handleFormSuccess, handleFormError } = useFormResultHandler({
    modelName: "Community",
    crudAction: "update",
    setFieldError: setError,
  });

  useEffect(() => {
    CommunityDataService.get(id)
      .then((res) => {
        setCommunity(res.data);
        setCommunityLoaded(true);
      })
      .catch((err) => {
        console.log("err: ", err, "communities#id: ", id);
        notifyError({
          title: "Community not found",
          message: `A Community with this id couldn't be found - an error occured: ${err}`,
          toastCntId: "modalNotificationCnt",
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (community) {
      reset(community);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [community]);

  useEffect(() => {
    if (communityLoaded) {
      setModalCaption("Edit Community *" + community.name + "*");
    } else {
      setModalCaption("Edit Community");
    }

    return () => {
      setModalCaption("Edit Community");
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [communityLoaded, community]);

  const onSubmit = (data) => {
    CommunityDataService.update(id, data)
      .then((res) => {
        const newList = communities.map((el) => {
          if (el._id === id) {
            return { ...el, ...data };
          }
          return el;
        });

        setCommunities(newList);
        handleFormSuccess({ objectName: community?.name });
        history.push("/communities");
      })
      .catch((err) => {
        handleFormError({ errorObject: err, objectId: id });
      });
  };

  return (
    <div className="ModalPage__body--inner CommunityModalPage ">
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
          {community?.type !== "Tenant" && (
            <>
              <SelectInputFormGroup
                name="type"
                formConfig={FormConfig.type}
                defaultValue={community?.type}
              />
              <SelectInputFormGroup
                name="grade"
                formConfig={FormConfig.grade}
                defaultValue={community?.grade}
              />
            </>
          )}

          {/* <TextInputFormGroup
            name="creator"
            formConfig={FormConfig.creator}
            defaultValue={community?.creator}
          /> */}
        </form>
      </FormProvider>
    </div>
  );
}
