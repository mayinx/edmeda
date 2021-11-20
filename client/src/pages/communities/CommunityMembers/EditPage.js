import { useForm, FormProvider } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import "./EditPage.css";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";

import FormConfig from "../../../domain/User/FormConfig";
import TextInputFormGroup from "../../../components/form/groups/TextInputFormGroup";
import SelectInputFormGroup from "../../../components/form/groups/SelectInputFormGroup";

import useNotify from "../../../components/notifications/useNotify";
import useFormResultHandler from "../../../components/form/useFormResultHandler";

import CommunityDataService from "../../../services/community";

export default function EditPage(props) {
  const { formId, setModalHeader } = props;
  const history = useHistory();
  const { notifyError } = useNotify();
  const { id, memberId } = useParams();
  const [user, setUser] = useState({});
  const [userLoaded, setUserLoaded] = useState(false);
  const formMethods = useForm();
  const {
    reset,
    handleSubmit,
    formState: { errors },
    setError,
  } = formMethods;
  const { handleFormSuccess, handleFormError } = useFormResultHandler({
    modelName: "User",
    crudAction: "update",
    setFieldError: setError,
  });

  useEffect(() => {
    CommunityDataService.getMember(id, memberId)
      .then((res) => {
        setUser(res.data);
        setUserLoaded(true);
      })
      .catch((err) => {
        notifyError({
          title: "User not found",
          message: `A User with this id couldn't be found - an error occured: ${err}`,
          toastCntId: "modalNotificationCnt",
          error: err,
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user) {
      reset(user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (userLoaded) {
      setModalHeader("Edit Community Member " + user.fullName + "");
    } else {
      setModalHeader("Edit Community Member");
    }

    return () => {
      setModalHeader("Edit Community Member");
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLoaded, user]);

  // on edit form submit
  const onSubmit = (data) => {
    CommunityDataService.updateMember(id, memberId, data)
      .then((res) => {
        // TODO:
        // const newList = communityMembers.map((el) => {
        //   if (el._id === id) {
        //     return { ...el, ...data };
        //   }
        //   return el;
        // });
        // setCommunityMembers(newList);
        handleFormSuccess({
          objectName: res?.data?.fullName,
          toastCntId: "modalNotificationCnt",
        });

        setTimeout(() => {
          history.goBack();
        }, 2000);
      })
      .catch((err) => {
        handleFormError({ errorObject: err, objectId: id });
      });
  };

  return (
    <div className="ModalPage__body--inner   CommunityModalPage EditPage">
      <FormProvider {...{ ...formMethods, ErrorMessage, errors }}>
        <form id={formId} className="Form" onSubmit={handleSubmit(onSubmit)}>
          <TextInputFormGroup
            name="firstName"
            formConfig={FormConfig.edit.firstName}
            defaultValue={user?.firstName}
          />

          <TextInputFormGroup
            name="lastName"
            formConfig={FormConfig.edit.lastName}
            defaultValue={user?.lastName}
          />

          <SelectInputFormGroup
            name="gender"
            formConfig={FormConfig.edit.gender}
            defaultValue={user?.gender}
          />

          <TextInputFormGroup
            name="email"
            formConfig={FormConfig.edit.email}
            defaultValue={user?.email}
          />
        </form>
      </FormProvider>
    </div>
  );
}
