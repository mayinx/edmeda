import "./UserProfileCard.css";
import UserFallbackProfilePic from "../../assets/user/fb_avatars/fbAvatar.png";

import { Link } from "react-router-dom";
import { FaRegEdit, FaRegTrashAlt, FaUserMinus } from "react-icons/fa";

export default function UserProfileCard(props) {
  // TODO: Refactor: Move that dependencies all up again - implement
  // event handlers on CommunityMembersPage-component + pass those
  // handlers down here - or use a context or whatever

  const {
    listStyle,
    user,
    community,

    onShow,
    onEdit,
    onRemove,
    onDelete,
  } = props;

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

  return (
    <section
      className={`UserProfileCard UserProfileCard--${user.type} `}
      key={user._id}
      id={user._id}
      onClick={(e) => onShow(e, community._id, user._id)}
    >
      <p className="User__ProfilePic-wrapper">
        <img src={`${avatarUrl}`} className="User__ProfilePic" alt="" />
      </p>
      <div className="user__meta">
        <div className="user__name truncate">{user?.fullName}</div>
        <div className="user__type truncate">
          <span
            className={`tag ${global.config.user.typeTagColorFor(user?.type)}`}
          >
            {user?.type}
          </span>
        </div>
        {/* <div className="truncate">{user?.creator?.fullName}</div> */}
      </div>
      <div className="user__actions">
        <Link
          className="user__action"
          to="#"
          onClick={(e) => onDelete(e, user.fullName, user._id, community._id)}
        >
          <FaRegTrashAlt className="actionIcon deleteIcon" />
        </Link>
        <Link
          className="user__action"
          to="#"
          onClick={(e) => onEdit(e, community._id, user._id)}
        >
          <FaRegEdit className="actionIcon editIcon" />
        </Link>
        {community.type !== "Tenant" && (
          <Link
            className="user__action"
            to="#"
            onClick={(e) => onRemove(e, user.fullName, user._id, community._id)}
          >
            <FaUserMinus className="actionIcon editMembersIcon" />
          </Link>
        )}
      </div>
    </section>
  );
}
