import "./UserListItem.css";
import UserFallbackProfilePic from "../../assets/user/fb_avatars/fbAvatar.png";
// import FemaleAvatar from "../../assets/user_default_avatars/Teacher_female_fbAvatar1.png";
import CommunitiesContext from "../../contexts/CommunitiesContext";

import { useContext } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { FaRegEdit, FaRegTrashAlt, FaUserMinus } from "react-icons/fa";
import axios from "axios";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { confirmAlert } from "react-confirm-alert"; // Import
// TODO Check - move to App.js?:
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import "../../components/notifications/ReactConfirmAlertOverrides.css";

import useNotify from "../../components/notifications/useNotify";

export default function UserListItem(props) {
  // TODO: Refactor: Move that dependencies all up again - implement
  // event handlers on CommunityMembersPage-componenet + pass those
  // handlers down here - or use a context or whatever
  const { user, community, communityMembers, setCommunityMembers } = props;
  let avatarUrl = user?.picture;
  if (!avatarUrl) {
    try {
      avatarUrl = user?.fbAvatarFileName
        ? require(`../../assets/user/fb_avatars/${user?.fbAvatarFileName}.png`)
            .default
        : UserFallbackProfilePic;
    } catch (e) {
      avatarUrl = UserFallbackProfilePic;
    }
  }

  // const { communities, setCommunities } = useContext(CommunitiesContext);

  const { currentUserData } = useContext(CurrentUserContext);

  const history = useHistory();
  const { notifySuccess, notifyError, notifyInfo } = useNotify();

  // console.log("user: ", user);
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

    axios
      .delete(`/api/communities/${communityId}/members/${memberId}`, {
        headers: {
          "x-auth-token":
            currentUserData?.token ?? localStorage.getItem("auth-token"),
        },
      })
      .then((res) => {
        console.log("res: ", res);
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

  const openCommunityPage = (e, id) => {
    history.push(`/communities/${id}`);
  };

  const openEditCommunityModal = (e, id) => {
    history.push(`/communities/${id}/edit`);
    e.stopPropagation();
    e.preventDefault();
  };

  const openEditCommunityMembersModal = (e, id) => {
    history.push(`/communities/${id}/members`);
    e.stopPropagation();
    e.preventDefault();
  };

  let userTypeTagColor = null;
  switch (user.type) {
    case "Student":
      userTypeTagColor = "green";
      break;
    case "Teacher":
      userTypeTagColor = "dark-blue";
      break;
    case "Parent":
      userTypeTagColor = "blue";
      break;
    default:
      userTypeTagColor = "blue";
      break;
  }

  return (
    <section
      className={`ResourceListItem UserListItem UserListItem--${user.type} `}
      key={user._id}
      id={user._id}
      // onClick={(e) => openCommunityPage(e, user._id)}
    >
      <p className="User__ProfilePic-wrapper">
        <img src={`${avatarUrl}`} className="User__ProfilePic" alt="" />
      </p>
      <div className="user__meta">
        <div className="truncate">{user?.fullName}</div>
        <div className="truncate">
          <span className={`tag ${userTypeTagColor}`}>{user?.type}</span>
        </div>
        <div className="truncate">{user?.creator?.fullName}</div>
      </div>
      <div className="user__actions">
        <Link
          className="user__action"
          to="#"
          // onClick={(e) => confirmResourceRemoval(e, user.name, user._id)}
          onClick={(e) =>
            notifyInfo({
              title: "Patience you must have, my young padawan...",
              message: "...for this feature is not yet implemented",
              toastCntId: "modalNotificationCnt",
            })
          }
        >
          <FaRegTrashAlt className="actionIcon deleteIcon" />
        </Link>
        <Link
          className="user__action"
          to="#"
          // onClick={(e) => openEditCommunityMembersModal(e, user._id)}
          onClick={(e) =>
            notifyInfo({
              title: "Patience you must have, my young padawan...",
              message: "...for this feature is not yet implemented",
              toastCntId: "modalNotificationCnt",
            })
          }
        >
          <FaRegEdit className="actionIcon editIcon" />
        </Link>
        {community.type !== "Tenant" && (
          <Link
            className="user__action"
            to="#"
            onClick={(e) =>
              confirmResourceRemoval(e, user.fullName, user._id, community._id)
            }
          >
            <FaUserMinus className="actionIcon editMembersIcon" />
          </Link>
        )}
      </div>
    </section>
  );
}
