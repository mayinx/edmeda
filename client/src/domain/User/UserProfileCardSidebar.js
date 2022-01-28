import "./UserProfileCardSidebar.css";

import { Link } from "react-router-dom";
import { FaRegEdit, FaRegTrashAlt, FaUserMinus } from "react-icons/fa";
import UserAvatar from "./UserAvatar";
import AuthService from "../../services/auth";

export default function UserProfileCard(props) {
  const { user, community, onEdit } = props;

  return (
    <section
      className={`UserProfileCardSidebar UserProfileCardSidebar--${user.type} `}
      key={user._id}
      id={user._id}
    >
      <div className="UserProfileCardSidebar--Inner">
        <UserAvatar user={user} />

        <div className="user__meta">
          <div className="user__name truncate wrapword fs-1_25 font-bold">
            {user?.fullName}
          </div>
          <div className="user__userName truncate wrapword fs-1 font-italic ">
            * a.k.a "{user?.userName}" *
          </div>
          <div className="user__membership_start fs-1 truncate">
            Member since{" "}
            {user?.createdAt
              ? new Intl.DateTimeFormat("de-DE").format(
                  new Date(user?.createdAt)
                )
              : "---"}
          </div>
          <div className="user__type truncate">
            <span
              className={`tag ${global.config.user.typeTagColorFor(
                user?.type
              )}`}
            >
              {user?.type}
            </span>
          </div>
        </div>
        <ul className="user__statistics">
          <li>
            <div>Communities</div>
            <div>{user?.communities?.length}</div>
          </li>
          <li>
            <div>Conections</div>
            <div>1057</div>
          </li>
          <li>
            <div>Profile Views</div>
            <div>157</div>
          </li>
          <li>
            <div>Posts</div>
            <div>18</div>
          </li>
        </ul>
        <div className="user__actions">
          {AuthService.isCurrentUser(user._id) && (
            <Link
              className="user__action"
              to="#"
              onClick={(e) => onEdit(e, community._id, user._id)}
            >
              <FaRegEdit className="actionIcon editIcon" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
