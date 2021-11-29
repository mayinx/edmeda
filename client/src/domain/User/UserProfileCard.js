import "./UserProfileCard.css";

import { Link } from "react-router-dom";
import { FaRegEdit, FaRegTrashAlt, FaUserMinus } from "react-icons/fa";
import UserAvatar from "./UserAvatar";

export default function UserProfileCard(props) {
  const { user, community, onShow, onEdit, onRemove, onDelete } = props;

  return (
    <section
      className={`UserProfileCard UserProfileCard--${user.type} `}
      key={user._id}
      id={user._id}
      onClick={(e) => onShow(e, community._id, user._id)}
    >
      <UserAvatar user={user} title={`Show ${user.firstName}'s Profile`} />
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
