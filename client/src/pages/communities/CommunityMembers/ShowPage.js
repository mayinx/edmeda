import { useParams } from "react-router";
import { useEffect, useState } from "react";
import "./Show.css";
import CommunityDataService from "../../../services/community";

import useNotify from "../../../components/notifications/useNotify";

import UserProfileCard from "../../../domain/User/UserProfileCard";

import CommunityContext from "../../../contexts/CommunityContext";
import { useContext } from "react";

export default function ShowPage(props) {
  const { id, memberId } = useParams();
  const [user, setUser] = useState({});
  const [userLoaded, setUserLoaded] = useState(false);
  const { currentCommunity } = useContext(CommunityContext);
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

  return (
    <div className="ModalPage__body--inner CommunityModalPage MemberPage">
      <div className="banner">
        <UserProfileCard user={user} community={currentCommunity} />
      </div>
    </div>
  );
}
