import "./CommunityListItem.css";
import SchoolCommunityFbProfilePic from "../../assets/community/fb_profile_pics/shutterstock_1856929843_mod.jpg";
import CommunitiesContext from "../../contexts/CommunitiesContext";
import { useContext } from "react";
import { useHistory } from "react-router";

import {
  FaRegEdit,
  FaRegTrashAlt,
  FaUsersCog,
  FaEllipsisV,
} from "react-icons/fa";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "../../components/notifications/ReactConfirmAlertOverrides.css";

import UserAvatar from "../../domain/User/UserAvatar";
import useNotify from "../../components/notifications/useNotify";
import CommunityDataService from "../../services/community";
// import DropdownMenu from "../../components/misc/DropdownMenu";
import { DropdownMenu, DropdownItem } from "../../components/misc/DropdownMenu";

export default function Community({ community }) {
  const { communities, setCommunities } = useContext(CommunitiesContext);

  const history = useHistory();
  const { notifySuccess, notifyError } = useNotify();

  const cofirmResourceRemoval = (e, resourceName, id) => {
    e.stopPropagation();

    confirmAlert({
      title: "Confirm to delete Community",
      message: `Are you sure you want to delete the community '${resourceName}' along with all its groups? (No worries: The Community- and Group-Members will NOT be touched at all by this action)`,
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

    CommunityDataService.destroy(id)
      .then((res) => {
        setCommunities(
          communities.filter((resource) => {
            return resource._id !== id;
          })
        );
        notifySuccess({
          title: "Community deleted",
          message: `The community '${resourceName}' was successfully deleted`,
        });
        history.goBack();
      })
      .catch((err) => {
        notifyError({
          title: "Community not deleted",
          message: `Failed to delete community ${
            resourceName ?? id ?? null
          } - an unexpeted error occured`,
          error: err,
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

  let profilePicUrl = community?.picture;
  if (!profilePicUrl) {
    try {
      profilePicUrl = community?.fbProfilePicFileName
        ? require(`../../assets/community/fb_profile_pics/${community?.fbProfilePicFileName}.jpg`)
            .default
        : SchoolCommunityFbProfilePic;
    } catch (e) {
      profilePicUrl = SchoolCommunityFbProfilePic;
    }
  }

  return (
    <section
      className={`CommunityListItem CommunityListItem--${community.type} `}
      key={community._id}
      id={community._id}
      onClick={(e) => {
        // Exit early if event has alreda been handled by dropdown menu !
        if (e.defaultPrevented) return;

        openCommunityPage(e, community._id);
      }}
    >
      <p className="Community__ProfilePic-wrapper">
        <img src={profilePicUrl} className="Community__ProfilePic" alt="" />
      </p>

      <div className="community__meta">
        <div className="community__name truncate">{community.name}</div>
        <div className="community__labels">
          <div className="community__owner truncate">
            <UserAvatar
              user={community?.creator}
              wrapper={false}
              className="CommunityCreatorAvatar rounded"
              title={`Community creator ${community?.creator?.userName} (${community?.creator?.type})`}
            />
          </div>
          <span
            className={`community__type tag ${global.config.community.typeTagColorFor(
              community?.type
            )}`}
          >
            {global.config.community.typeTagCaptionFor(community?.type)}
          </span>
        </div>
      </div>

      <div className="community__actions">
        <DropdownMenu
          id={community._id}
          toggleIcon={<FaEllipsisV />}
          toggleLinkClassName="community__action"
        >
          <DropdownItem
            caption={"Community Members"}
            icon={<FaUsersCog />}
            onClick={(e) => openEditCommunityMembersModal(e, community._id)}
          ></DropdownItem>

          <DropdownItem
            caption={"Edit Community"}
            icon={<FaRegEdit />}
            onClick={(e) => openEditCommunityModal(e, community._id)}
          />

          {community.type !== "Tenant" && (
            <DropdownItem
              caption={"Delete Community"}
              icon={<FaRegTrashAlt />}
              onClick={(e) =>
                cofirmResourceRemoval(e, community.name, community._id)
              }
            />
          )}
        </DropdownMenu>
      </div>
    </section>
  );
}
