import { useParams } from "react-router";
import { useEffect, useState } from "react";
import "./ShowPage.css";
import CommunityDataService from "../../../services/community";

import useNotify from "../../../components/notifications/useNotify";

import UserProfileCard from "../../../domain/User/UserProfileCard";

import CommunityContext from "../../../contexts/CommunityContext";
import { useContext } from "react";

import CommunityList from "../../../domain/Community/CommunityList";
import UserDataService from "../../../services/user";

export default function ShowPage(props) {
  const { id, memberId } = useParams();
  const [user, setUser] = useState({});
  const [userLoaded, setUserLoaded] = useState(false);
  const [communities, setCommunities] = useState([]);
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

  useEffect(() => {
    if (user) {
      UserDataService.communities(user._id)
        .then((res) => {
          console.log("yohooo !!!!! - data: ", res.data);
          console.log("user: ", user);
          setCommunities(res.data || []);
        })
        .catch((err) => {
          console.log("nohoooooo !!!!! - err: ", err);
          notifyError({
            title: "Communities not accessible",
            message: `Your communities can't be accessed - an error occured: ${err}`,
          });
        });
    }
  }, [user, userLoaded]);

  return (
    <div className="ModalPage__body--inner CommunityModalPage MemberPage">
      <div className="MemberPage__Banner">
        <UserProfileCard user={user} community={currentCommunity} />
      </div>
      <div className="MemberPage__Main">
        <div className="MemberPage__Content">
          <CommunityList resources={communities} />
        </div>
        <div className="MemberPage__Sidebar">{"Name:"}</div>
      </div>
    </div>
  );
}