import "./UserListItem.css";
import UserFallbackProfilePic from "../../assets/user/fb_avatars/fbAvatar.png";
// import FemaleAvatar from "../../assets/user_default_avatars/Teacher_female_fbAvatar1.png";
import CommunitiesContext from "../../contexts/CommunitiesContext";

import { useContext } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import {
  FaRegEdit,
  FaRegTrashAlt,
  FaUserAlt,
  FaUsersCog,
} from "react-icons/fa";
import axios from "axios";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { confirmAlert } from "react-confirm-alert"; // Import
// TODO Check - move to App.js?:
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import "../../components/notifications/ReactConfirmAlertOverrides.css";

import useNotify from "../../components/notifications/useNotify";

export default function UserListItem({ user }) {
  let avatarUrl = null;
  try {
    avatarUrl =
      user?.picture ?? user?.fbAvatarFileName
        ? require(`../../assets/user/fb_avatars/${user?.fbAvatarFileName}.png`)
            .default
        : UserFallbackProfilePic;
  } catch (e) {
    avatarUrl = UserFallbackProfilePic;
  }

  // const anotherAvatarUrl = `../../assets/happy-students.jpg`;
  // const resolvedAvatarUrl = require(`${anotherAvatarUrl}`).default;
  // console.log("resolvedAvatarUrl: ", resolvedAvatarUrl);
  // const lala = "assets";
  // const resolvedAvatarUrl = require(`../../${lala}/happy-students.jpg`).default;
  // const resolvedAvatarUrl = require(`../../${lala}/user_default_avatars/Teacher_female_fbAvatar1.png`)
  //   .default;

  const { communities, setCommunities } = useContext(CommunitiesContext);

  const { currentUserData } = useContext(CurrentUserContext);

  const history = useHistory();
  const { notifySuccess, notifyError } = useNotify();

  // console.log("user: ", user);
  const cofirmResourceRemoval = (e, resourceName, id) => {
    e.stopPropagation();

    confirmAlert({
      title: "Confirm to delete User",
      message: `Are you sure you want to delete the user '${resourceName}' along with all its groups? (No worries: The User- and Group-Members will NOT be touched at all by this action)`,
      buttons: [
        {
          label: "Yep, delete",
          onClick: () => removeResource(e, resourceName, id),
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

  const removeResource = (e, resourceName, id) => {
    e.stopPropagation();

    axios
      .delete(`api/communities/${id}`, {
        headers: {
          "x-auth-token":
            currentUserData?.token ?? localStorage.getItem("auth-token"),
        },
      })
      .then((res) => {
        console.log("res: ", res);
        setCommunities(
          communities.filter((resource) => {
            return resource._id !== id;
          })
        );
        notifySuccess({
          title: "User deleted",
          msg: `The user '${resourceName}' was successfully deleted`,
        });
        history.goBack();
      })
      .catch((err) => {
        console.log(
          `Failed to delete user ${
            resourceName ?? id ?? null
          } - something went wrong: `,
          err
        );
        notifyError({
          title: "User not deleted",
          msg: `Failed to delete user ${
            resourceName ?? id ?? null
          } - an unexpeted error occured`,
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

  return (
    <section
      className={`ResourceListItem UserListItem UserListItem--${user.type} `}
      key={user._id}
      id={user._id}
      // onClick={(e) => openCommunityPage(e, user._id)}
    >
      <p className="User__ProfilePic-wrapper">
        <img src={`${avatarUrl}`} className="User__ProfilePic" alt="" />
        {/* <FaUserAlt className="NavItem__Icon userAvatarIcon User__ProfilePic" /> */}
      </p>
      <div className="user__meta">
        <div className="truncate">{user?.fullName}</div>
        <div className="truncate">{user?.creator?.fullName}</div>
      </div>
      <div className="user__actions">
        <Link
          className="user__action"
          to="#"
          // onClick={(e) => cofirmResourceRemoval(e, user.name, user._id)}
        >
          <FaRegTrashAlt className="actionIcon deleteIcon" />
        </Link>
        <Link
          className="user__action"
          to="#"
          // onClick={(e) => openEditCommunityModal(e, user._id)}
        >
          <FaRegEdit className="actionIcon editIcon" />
        </Link>
        <Link
          className="user__action"
          to="#"
          // onClick={(e) => openEditCommunityMembersModal(e, user._id)}
        >
          <FaUsersCog className="actionIcon editMembersIcon" />
        </Link>
      </div>
    </section>
  );
}
