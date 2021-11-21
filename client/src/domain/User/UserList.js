import "./UserList.css";
import UserProfileCard from "./UserProfileCard.js";
import ReactLoading from "react-loading";
import CommunityDataService from "../../services/community";
import { useHistory } from "react-router";
import useNotify from "../../components/notifications/useNotify";

import { confirmAlert } from "react-confirm-alert";
// TODO Check - move to App.js?:
import "react-confirm-alert/src/react-confirm-alert.css";
import "../../components/notifications/ReactConfirmAlertOverrides.css";

export default function UserList(props) {
  const { community, communityMembers, setCommunityMembers, listStyle } = props;

  const history = useHistory();
  const { notifySuccess, notifyError, notifyInfo } = useNotify();

  const confirmResourceRemoval = (e, memberName, memberId, communityId) => {
    e.stopPropagation();

    confirmAlert({
      title: "Confirm to remove Community Member",
      message: `Are you sure you want to remove the user '${memberName}' from the current community?`,
      buttons: [
        {
          label: "Yep, delete",
          onClick: () => removeResource(e, memberName, memberId, communityId),
        },
        {
          label: "Nope, keep",
          onClick: () => {
            return false;
          },
        },
      ],
    });
  };

  const removeResource = (e, memberName, memberId, communityId) => {
    e.stopPropagation();
    CommunityDataService.removeMember(communityId, memberId)
      .then((res) => {
        setCommunityMembers(
          communityMembers.filter((resource) => {
            return resource._id !== memberId;
          })
        );
        notifySuccess({
          title: "Member removed",
          message: `The user '${memberName}' was successfully removed from this community`,
          toastCntId: "modalNotificationCnt",
        });
        history.goBack();
      })
      .catch((err) => {
        console.log(
          `Failed to remove member ${
            memberName ?? memberId ?? null
          } from community - something went wrong: `,
          err
        );
        notifyError({
          title: "Member not removed",
          message: `Failed to remove user ${
            memberName ?? memberId ?? null
          } from community - an unexpeted error occured`,
          toastCntId: "modalNotificationCnt",
        });
      });
  };

  // TODO: Implement:
  const confirmResourceDeletion = (e, memberName, memberId, communityId) => {
    e.stopPropagation();

    console.log("confirmResourceDeletion");

    notifyInfo({
      title: "Patience you must have, my young padawan...",
      message: "...for this feature is not yet implemented",
      toastCntId: "modalNotificationCnt",
    });

    // TODO: Implement:
    //
    // confirmAlert({
    //   title: "Confirm to delete Community Member",
    //   message: `Are you sure you want to delete the user '${memberName}' from the current and all (!) other communities?`,
    //   buttons: [
    //     {
    //       label: "Yep, delete",
    //       onClick: () => deleteResource(e, memberName, memberId, communityId),
    //     },
    //     {
    //       label: "Nope, keep",
    //       onClick: () => {
    //         return false;
    //       },
    //     },
    //   ],
    // });
  };

  const deleteResource = (e, memberName, memberId, communityId) => {
    e.stopPropagation();
    CommunityDataService.destroyMember(communityId, memberId)
      .then((res) => {
        setCommunityMembers(
          communityMembers.filter((resource) => {
            return resource._id !== memberId;
          })
        );
        notifySuccess({
          title: "Member deleted",
          message: `The user '${memberName}' was successfully deleted and removed from this and all other communities`,
          toastCntId: "modalNotificationCnt",
        });
        history.goBack();
      })
      .catch((err) => {
        notifyError({
          title: "Member not deleted",
          message: `Failed to delete user ${
            memberName ?? memberId ?? null
          }  an unexpeted error occured`,
          toastCntId: "modalNotificationCnt",
          error: err,
        });
      });
  };

  const editResource = (e, communityId, memberId) => {
    // TODO: Refactor this into a pathes-module - e.g. editCommunitiesMembersPath(communityId, memberId)
    history.push(`/communities/${communityId}/members/${memberId}/edit`);
    e.stopPropagation();
    e.preventDefault();
  };

  const showResource = (e, communityId, memberId) => {
    history.push(`/communities/${communityId}/members/${memberId}`);
    e.stopPropagation();
    e.preventDefault();
  };

  // TODO: Implememnt at least list-view as well
  function renderResourceItem(user) {
    const props = {
      user: user,
      key: user._id,
      community: community,
      onShow: showResource,
      onEdit: editResource,
      onRemove: confirmResourceRemoval,
      onDelete: confirmResourceDeletion,
    };
    switch (listStyle) {
      case "cards":
        return <UserProfileCard {...props} />;
      case "list":
        // TODO - e.g.:
        // return <UserListItem {...props} />;
        return <UserProfileCard {...props} />;
      case "table":
        // TODO - e.g.:
        // return <UserTableItem {...props} />;
        return <UserProfileCard {...props} />;
      default:
        return <UserProfileCard {...props} />;
    }
  }

  function WithListStyle(props) {
    switch (listStyle) {
      case "cards":
        return (
          <div className="ResourcesList__Items UserList__Items">
            {props.children}
          </div>
        );
      case "list":
        return (
          <ul className="ResourcesList__Items UserList__Items">
            {props.children}
          </ul>
        );
      case "table":
        return (
          <table className="ResourcesList__Items UserList__Items">
            {props.children}
          </table>
        );
      default:
        return (
          <div className="ResourcesList__Items UserList__Items">
            {props.children}
          </div>
        );
    }
  }

  function renderResources() {
    if (Array.isArray(communityMembers) && communityMembers.length) {
      return (
        <WithListStyle>
          {communityMembers.map((user) => {
            return renderResourceItem(user);
          })}
        </WithListStyle>
      );
    } else {
      return (
        <ReactLoading
          type={"bars"}
          color={"#9773a7"}
          height={100}
          width={100}
          className="PageLoadingAnimation"
        />
        // <div className="CollectionEmpty">
        //   <h2>Ups - looks like you didn't create any users yet!</h2>

        //   <Link to="communities/new">
        //     <button className="btn rounded green">
        //       Create your first user!
        //     </button>
        //   </Link>
        // </div>
      );
    }
  }

  return (
    <section className="ResourcesList UserList">{renderResources()}</section>
  );
}
