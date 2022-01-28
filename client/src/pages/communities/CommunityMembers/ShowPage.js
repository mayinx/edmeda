import { useParams } from "react-router";
import { useEffect, useState } from "react";
import "./ShowPage.css";
import CommunityDataService from "../../../services/community";

import BannerFallbackPic from "../../../assets/user/banner/pic-12-2kx845.png";

import useNotify from "../../../components/notifications/useNotify";

import UserProfileCardSidebar from "../../../domain/User/UserProfileCardSidebar";

import CommunityContext from "../../../contexts/CommunityContext";
import { useContext } from "react";

import CommunityList from "../../../domain/Community/CommunityList";
import UserDataService from "../../../services/user";
import ReactLoading from "react-loading";

import { useHistory } from "react-router-dom";

export default function ShowPage(props) {
  const { id, memberId } = useParams();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [profileBannerImgUrl, setProfileBannerImgUrl] = useState(
    BannerFallbackPic
  );
  const [communities, setCommunities] = useState([]);
  const { currentCommunity } = useContext(CommunityContext);
  const { notifyError } = useNotify();

  const history = useHistory();

  useEffect(() => {
    setIsLoading(true);

    setHasError(false);
    CommunityDataService.getMember(id, memberId)
      .then((data) => {
        setUser(data.data || {});
      })
      .catch((err) => {
        setHasError(true);
        notifyError({
          title: "User not found",
          message: `A User with this id couldn't be found - an error occured: ${err}`,
          toastCntId: "modalNotificationCnt",
          error: err,
        });
      })
      .finally(function () {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (user) {
      UserDataService.communities(user._id)
        .then((res) => {
          setCommunities(res.data || []);
        })
        .catch((err) => {
          notifyError({
            title: "Communities not accessible",
            message: `Your communities can't be accessed - an error occured: ${err}`,
          });
        });

      let bannerImgUrl = user?.bannerImage;
      if (!bannerImgUrl) {
        try {
          bannerImgUrl = user?.fbAvatarFileName
            ? require(`../../../assets/user/banner/${user?.fbBannerPicFileName}`)
                .default
            : BannerFallbackPic;
        } catch (e) {
          bannerImgUrl = BannerFallbackPic;
        }
        setProfileBannerImgUrl(bannerImgUrl);
      }
    }
    // }, [user, userLoaded]);
  }, [user]);

  const editUserProfile = (e, communityId, memberId) => {
    // TODO: Refactor this into a pathes-module - e.g. editCommunitiesMembersPath(communityId, memberId)
    history.push(`/communities/${communityId}/members/${memberId}/edit`);
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <>
      <div className="ModalPage__body--inner CommunityModalPage MemberPage">
        {hasError && <p className="ErrorIndicator">Something went wrong</p>}
        {isLoading && (
          <ReactLoading
            type={"bars"}
            color={"#9773a7"}
            height={100}
            width={100}
            className="PageLoadingAnimation"
          />
        )}
        {!isLoading && !hasError && (
          <>
            <div className="MemberPage__Banner">
              <img
                src={profileBannerImgUrl}
                className="BannerImage"
                alt="Member Page Banner"
              />
              <div className="BannerImage__Overlay">
                {/* {user.fullName} */}
              </div>
            </div>
            <div className="MemberPage__Main">
              <div className="MemberPage__Content">
                <div className="MemberPage__Content--Inner">
                  <CommunityList resources={communities} />
                </div>
              </div>
              <div className="MemberPage__Sidebar">
                <div className="MemberPage__Sidebar--Inner">
                  {/* <UserProfileCard user={user} community={currentCommunity} /> */}
                  <UserProfileCardSidebar
                    user={user}
                    community={currentCommunity}
                    onEdit={(e) => {
                      editUserProfile(e, id, user._id);
                    }}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
