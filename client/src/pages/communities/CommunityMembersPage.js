import { useForm, FormProvider } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import { useEffect, useState } from "react";
import { useParams } from "react-router";

import FormConfig from "../../domain/User/FormConfig";
import InputFormGroup from "../../components/form/groups/InputFormGroup";
import SelectInputFormGroup from "../../components/form/groups/SelectInputFormGroup";

import useNotify from "../../components/notifications/useNotify";
import useFormResultHandler from "../../components/form/useFormResultHandler";

import { default as CommunityMembersList } from "../../domain/User/UserList";

import "./CommunityMembersPage.css";
// TODO: Once the various forms are extracted, ensure that media queries are pulled in last - or by component ...
import "./CommunityMembers/media-queries.css";

import _ from "lodash";
import { FaRegTimesCircle } from "react-icons/fa";

import CommunityDataService from "../../services/community";

import CommunityMembersContext from "../../contexts/CommunityMembersContext";
import { useContext } from "react";
import ModalContext from "../../contexts/ModalContext";

export default function CommunityMembersPage(props) {
  const { bottomBarToggled, toggleBottomBar, formId } = props;
  const { notifyError } = useNotify();
  const { id } = useParams();
  const [community, setCommunity] = useState({});
  const [communityMembers, setCommunityMembers] = useState([]);
  const [communityMembersLoaded, setCommunityMembersLoaded] = useState(false);

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

  // useEffect(() => {
  //   if (community) {
  //     reset(community);
  //   }
  // }, [community]);

  useEffect(() => {
    CommunityDataService.getMembers(id)
      .then((res) => {
        setCommunity(res.data.community);
        setCommunityMembers(res.data.members);
        setCommunityMembersLoaded(true);
      })
      .catch((err) => {
        notifyError({
          title: "Community not found",
          message: `An unexpected error occured`,
          toastCntId: "modalNotificationCnt",
          error: err,
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (communityMembersLoaded) {
      setModalCaption("Community Members (" + communityMembers.length + ")");
    } else {
      setModalCaption("Community Members (--)");
    }

    return () => {
      setModalCaption("Community Members (--)");
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [communityMembersLoaded, communityMembers]);

  // Form related effects
  useEffect(() => {
    reset({ type: "", fullName: "", email: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [community, communityMembers]);

  const onNewUserSubmit = (data) => {
    CommunityDataService.addMember(id, data)
      .then((res) => {
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
      })
      .catch((err) => {
        handleFormError({ errorObject: err, objectId: id });
      });
  };

  return (
    <CommunityMembersContext.Provider
      value={{ communityMembers, setCommunityMembers }}
    >
      <div className="ModalPage__body--inner CommunityModalPage CommunityMembersModalPage">
        <CommunityMembersList
          communityMembers={communityMembers}
          // TODO: Handle events/actions here and pass down handlers only
          setCommunityMembers={setCommunityMembers}
          community={community}
        />

        <section
          className={`BottomBar ${
            bottomBarToggled ? "BottomBar--expanded" : "BottomBar--hidden"
          }`}
        >
          <div className="BottomBar__Header ">
            <h3 className="BottomBar__HeaderCaption">New User</h3>
            <div
              className="closeBottomBarAction"
              onClick={() => {
                toggleBottomBar(false);
              }}
            >
              <FaRegTimesCircle />
            </div>
          </div>
          <div className="BottomBar__Body">
            <FormProvider {...{ ...formMethods, ErrorMessage, errors }}>
              <form
                id={formId}
                className="Form NewUserForm"
                onSubmit={handleSubmit(onNewUserSubmit)}
              >
                <SelectInputFormGroup
                  name="type"
                  formConfig={FormConfig.new.type}
                />

                <InputFormGroup
                  name="fullName"
                  formConfig={FormConfig.new.fullName}
                />
                <InputFormGroup
                  name="email"
                  formConfig={FormConfig.new.email}
                />

                {/* <TextInputFormGroup
            name="creator"
            formConfig={FormConfig.creator}
            defaultValue={community?.creator}
          /> */}
                <button
                  form={formId}
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
    </CommunityMembersContext.Provider>
  );
}
