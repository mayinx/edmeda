import { useParams } from "react-router";
import { useEffect, useState } from "react";
import "./Show.css";
import CommunityDataService from "../../../services/community";

import useNotify from "../../../components/notifications/useNotify";
import UserFallbackProfilePic from "../../../assets/user/fb_avatars/fbAvatar.png";

export default function ShowPage(props) {
  const { id, memberId } = useParams();
  const [user, setUser] = useState({});
  const [userLoaded, setUserLoaded] = useState(false);

  const { notifyError } = useNotify();

  useEffect(() => {
    // setModalCaption("Community Member Profile");
    CommunityDataService.getMember(id, memberId)
      .then((data) => {
        console.log("Happy Data: ", data);
        setUser(data.data);
        setUserLoaded(true);
      })
      .catch((err) => {
        notifyError({
          title: "User not found",
          message: `A User with this id couldn't be found - an error occured: ${err}`,
          toastCntId: "modalNotificationCnt",
          error: err,
        });
      });
  }, []);

  let avatarUrl = user?.picture;
  if (!avatarUrl) {
    try {
      avatarUrl = user?.fbAvatarFileName
        ? require(`../../../assets/user/fb_avatars/${user?.fbAvatarFileName}.png`)
            .default
        : UserFallbackProfilePic;
    } catch (e) {
      avatarUrl = UserFallbackProfilePic;
    }
  }

  return (
    <div className="ModalPage__body--inner CommunityModalPage MemberPage">
      <section className={`UserProfileCard UserProfileCard--${user.type} `}>
        <p className="User__ProfilePic-wrapper">
          <img src={`${avatarUrl}`} className="User__ProfilePic" alt="" />
        </p>
        <div className="user__meta">
          <div className="user__name truncate">{user?.fullName}</div>
          <div className="user__type truncate">
            <span
              className={`tag ${global.config.user.typeTagColorFor(
                user?.type
              )}`}
            >
              {user?.type}
            </span>
          </div>
          {/* <div className="truncate">{user?.creator?.fullName}</div> */}
        </div>
        <div className="user__actions"></div>
      </section>
    </div>
  );
}
