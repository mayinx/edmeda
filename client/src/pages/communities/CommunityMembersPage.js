import { useForm, FormProvider } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import "./Form.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
// import CommunitiesContext from "../../contexts/CommunitiesContext";
import FormConfig from "../../domain/User/FormConfig";
import InputFormGroup from "../../components/form/groups/InputFormGroup";
import SelectInputFormGroup from "../../components/form/groups/SelectInputFormGroup";
import CurrentUserContext from "../../contexts/CurrentUserContext";

// import ReactLoading from "react-loading";

import useNotify from "../../components/notifications/useNotify";
import useFormResultHandler from "../../components/form/useFormResultHandler";
// import { UserList as CommunityMembersList } from "../../domain/User/UserList";
import { default as CommunityMembersList } from "../../domain/User/UserList";

import "./CommunityMembersPage.css";
// TODO: Once the varios forms are extracted, ensure that media queries are pulled in last - or by component ...
import "./CommunityMembers/media-queries.css";

import _ from "lodash";
import { FaRegTimesCircle } from "react-icons/fa";

export default function CommunityMembersPage(props) {
  // const { communities, setCommunities } = useContext(CommunitiesContext);
  // const history = useHistory();
  const { notifyError } = useNotify();
  const { id } = useParams();
  const [community, setCommunity] = useState({});
  const [communityMembers, setCommunityMembers] = useState([]);
  // const [isLoading, setIsLoading] = useState(undefined);

  const formMethods = useForm();
  const {
    reset,
    handleSubmit,
    formState: { errors },
    setError,
    setFocus,
  } = formMethods;

  const { handleFormSuccess, handleFormError } = useFormResultHandler({
    modelName: "Community",
    crudAction: "update",
    setFieldError: setError,
  });

  const { currentUserData } = useContext(CurrentUserContext);

  // useEffect(() => {
  //   if (community) {
  //     reset(community);
  //   }
  // }, [community]);

  useEffect(() => {
    axios
      .get(`/api/communities/${id}/members`, {
        headers: {
          "x-auth-token":
            currentUserData?.token ?? localStorage.getItem("auth-token"),
        },
      })
      .then((res) => {
        console.log("res: ", res);
        setCommunity(res.data.community);
        setCommunityMembers(res.data.members);
      })
      .catch((err) => {
        console.log("err: ", err);
        console.log("id:", id);
        notifyError({
          title: "Community not found",
          message: `An unexpected error occured: ${err}`,
          toastCntId: "modalNotificationCnt",
        });
      });
  }, []);

  // Form related effeects
  useEffect(() => {
    // if (community) {
    reset({ type: "", fullName: "", email: "" });
    // }
  }, [community, communityMembers]);

  const onSubmit = (data) => {
    console.log("onSubmit");
    axios
      .post(`/api/communities/${id}/members`, data, {
        headers: {
          "x-auth-token":
            currentUserData?.token ?? localStorage.getItem("auth-token"),
        },
      })
      .then((res) => {
        console.log("res: ", res);
        // ON EDIT:
        // const newList = communityMembers.map((el) => {
        //   if (el._id === id) {
        //     return { ...el, ...data };
        //   }
        //   return el;
        // });
        // setCommunityMembers(newList);

        // ON NEW
        setCommunityMembers([res.data, ...communityMembers]);
        reset({ type: res.data.type });

        handleFormSuccess({
          objectName: community?.name,
          title: "New Community member added",
          message: `The ${_.camelCase(res?.data?.type) ?? "user"} ${
            res?.data?.fullName ?? null
          } was sucessfully registered and added as a new Community-member`,
          toastCntId: "modalNotificationCnt",
        });

        // history.push("/communities");
      })
      .catch((err) => {
        // console.log(
        //   `Couldn't update the community with the id '${id}' - something went wrong: `,
        //   err
        // );
        // notifyError({
        //   title: "Community update failed",
        //   message: `The Community '${
        //     community?.name ?? id
        //   }' couldn't be updated - an error occured: ${err}`,
        //   toastCntId: "modalNotificationCnt",
        // });

        handleFormError({ errorObject: err, objectId: id });
      });
  };
  // CommunityMembersModalPage;

  // onMemberRemoval;

  return (
    <div className="ModalPage__bodyInner CommunityMembersModalPage">
      <CommunityMembersList
        communityMembers={communityMembers}
        // TODOD: Handle events/actions here and pass down handlers only
        setCommunityMembers={setCommunityMembers}
        community={community}
      />

      <section
        className={`BottomBar ${
          props.bottomBarToggled ? "BottomBar--expanded" : "BottomBar--hidden"
        }`}
      >
        <div className="BottomBar__Header ">
          <h3 className="BottomBar__HeaderCaption">New User</h3>
          <div
            className="closeBottomBarAction"
            onClick={() => {
              props.toggleBottomBar(false);
            }}
          >
            <FaRegTimesCircle />
          </div>
        </div>
        <div className="BottomBar__Body">
          <FormProvider {...{ ...formMethods, ErrorMessage, errors }}>
            <form
              id={props.formId}
              className="Form NewUserForm"
              onSubmit={handleSubmit(onSubmit)}
            >
              <SelectInputFormGroup
                name="type"
                formConfig={FormConfig.new.type}
              />

              <InputFormGroup
                name="fullName"
                formConfig={FormConfig.new.fullName}
              />
              <InputFormGroup name="email" formConfig={FormConfig.new.email} />

              {/* <TextInputFormGroup
            name="creator"
            formConfig={FormConfig.creator}
            defaultValue={community?.creator}
          /> */}
              <button
                form={props.formId}
                className="btn rounded green newResourceBtn createCommunityMemberBtn"
                type="submit"
              >
                Create User
              </button>
            </form>
          </FormProvider>
        </div>
      </section>
    </div>
  );
}