import { useForm, FormProvider } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import "../Form.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";

import FormConfig from "../../../domain/User/FormConfig";
import TextInputFormGroup from "../../../components/form/groups/TextInputFormGroup";
import SelectInputFormGroup from "../../../components/form/groups/SelectInputFormGroup";

import useNotify from "../../../components/notifications/useNotify";
import useFormResultHandler from "../../../components/form/useFormResultHandler";
import AuthService from "../../../services/auth";

export default function EditPage(props) {
  // export default function EditCommunityMemberPage(props) {
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
    axios
      .get(`/api/communities/${id}/members/${memberId}`, {
        headers: AuthService.authHeader(),
      })
      .then((res) => {
        setUser(res.data);
        setUserLoaded(true);
      })
      .catch((err) => {
        console.log("err: ", err, "communities#id: ", id);
        notifyError({
          title: "User not found",
          message: `A User with this id couldn't be found - an error occured: ${err}`,
          toastCntId: "modalNotificationCnt",
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

  // const onSubmit = (data) => {
  //   axios
  //     .patch(`/api/communities/${id}`, data, {
  //       headers: AuthService.authHeader(),
  //     })
  //     .then((res) => {
  //       const newList = communities.map((el) => {
  //         if (el._id === id) {
  //           return { ...el, ...data };
  //         }
  //         return el;
  //       });

  //       setCommunities(newList);
  //       handleFormSuccess({ objectName: user?.name });
  //       history.push("/communities");
  //     })
  //     .catch((err) => {
  //       handleFormError({ errorObject: err, objectId: id });
  //     });
  // };

  const onSubmit = (data) => {
    axios
      .patch(`/api/communities/${id}/members/${memberId}`, data, {
        headers: AuthService.authHeader(),
      })
      .then((res) => {
        // const newList = communities.map((el) => {
        //   if (el._id === id) {
        //     return { ...el, ...data };
        //   }
        //   return el;
        // });

        // setCommunities(newList);
        handleFormSuccess({ objectName: user?.name });
        // history.push("/communities");
        history.goBack();
      })
      .catch((err) => {
        handleFormError({ errorObject: err, objectId: id });
      });
  };

  return (
    <div className="ModalPage__bodyInner CommunityModalFormPage EditCommunityModalFormPage">
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
