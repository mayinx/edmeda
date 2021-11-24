import "./UserProfileCardSidebar.css";
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
      className={`UserProfileCardSidebar UserProfileCardSidebar--${user.type} `}
      key={user._id}
      id={user._id}
      onClick={(e) => onShow(e, community._id, user._id)}
    >
      <div className="UserProfileCardSidebar--Inner">
        <p className="User__ProfilePic-wrapper">
          <img src={`${avatarUrl}`} className="User__ProfilePic" alt="" />
        </p>
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
            <div>10</div>
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
              onClick={(e) =>
                onRemove(e, user.fullName, user._id, community._id)
              }
            >
              <FaUserMinus className="actionIcon editMembersIcon" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
