import "./CommunityListItem.css";
// import CommunityFallbackProfilePic from "../../assets/happy-students.jpg";
// import CommunityFallbackProfilePic from "../../assets/community/fb_profile_pics/shutterstock_1856929843_mod.jpg";
import SchoolCommunityFbProfilePic from "../../assets/community/fb_profile_pics/shutterstock_1856929843_mod.jpg";
// import ClassCommunityFbProfilePic from "../../assets/community/fb_profile_pics/shutterstock_1856929843_mod.jpg";

// import OtherCommunityFbProfilePic1 from "../../assets/community/fb_profile_pics/shutterstock_1856929843.jpg";
// import OtherCommunityFbProfilePic2 from "../../assets/community/fb_profile_pics/shutterstock_1850173759.jpg";
// import OtherCommunityFbProfilePic3 from "../../assets/community/fb_profile_pics/shutterstock_1764969362.jpg";
// import OtherCommunityFbProfilePic4 from "../../assets/community/fb_profile_pics/shutterstock_220343119.jpg";
// import OtherCommunityFbProfilePic5 from "../../assets/community/fb_profile_pics/shutterstock_1634697031.jpg";

// School Communiy:
// Class Communiy:
// - shutterstock_220343119_mod.jpg;
// - shutterstock_220343119.jpg;
// Course Communiy:
// - shutterstock_1634697031_mod.jpg;
// - shutterstock_1634697031.jpg;
// Custom Communiy:
// - shutterstock_220343119_mod.jpg;
// - shutterstock_220343119.jpg;

// shutterstock_1764969362_mod.jpg;
// shutterstock_1764969362.jpg;
// shutterstock_1850173759_mod.jpg;
// shutterstock_1850173759.jpg;
// shutterstock_1856929843_mod - v2.jpg;
// shutterstock_1856929843_mod.jpg;
// shutterstock_1856929843.jpg;
import _ from "lodash";
import CommunitiesContext from "../../contexts/CommunitiesContext";

import { useContext } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { FaRegEdit, FaRegTrashAlt, FaUsersCog } from "react-icons/fa";
import axios from "axios";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import "../../components/notifications/ReactConfirmAlertOverrides.css";

import useNotify from "../../components/notifications/useNotify";

export default function Community({ community }) {
  const { communities, setCommunities } = useContext(CommunitiesContext);

  const { currentUserData } = useContext(CurrentUserContext);

  const history = useHistory();
  const { notifySuccess, notifyError } = useNotify();

  // console.log("community: ", community);
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

    axios
      .delete(`/api/communities/${id}`, {
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
          title: "Community deleted",
          message: `The community '${resourceName}' was successfully deleted`,
        });
        history.goBack();
      })
      .catch((err) => {
        console.log(
          `Failed to delete community ${
            resourceName ?? id ?? null
          } - something went wrong: `,
          err
        );
        notifyError({
          title: "Community not deleted",
          message: `Failed to delete community ${
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

  // TODO: handle this like user avatars - but for now...
  let communityTypeTagColor = null;
  let communityTypeTagCaption = community.type;

  switch (community.type) {
    case "Tenant":
      communityTypeTagColor = "dark-blue";
      communityTypeTagCaption = "School";

      break;
    case "Class":
      communityTypeTagColor = "blue";

      break;
    case "Course":
      communityTypeTagColor = "green";
      break;
    case "Custom":
      communityTypeTagColor = "yellow";
      break;
    default:
      communityTypeTagColor = "blue";
      break;
  }

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
      className={`ResourceListItem CommunityListItem CommunityListItem--${community.type} `}
      key={community._id}
      id={community._id}
      onClick={(e) => openCommunityPage(e, community._id)}
    >
      <p className="Community__ProfilePic-wrapper">
        <img src={profilePicUrl} className="Community__ProfilePic" alt="" />
      </p>

      <div className="community__meta">
        <div className="truncate">{community.name}</div>
        <div className="truncate">{community?.creator?.fullName}</div>
        <span className={`tag ${communityTypeTagColor}`}>
          {communityTypeTagCaption}
        </span>
      </div>

      <div className="community__actions">
        {community.type !== "Tenant" && (
          <Link
            className="community__action"
            to="#"
            onClick={(e) =>
              cofirmResourceRemoval(e, community.name, community._id)
            }
          >
            <FaRegTrashAlt className="actionIcon deleteIcon" />
          </Link>
        )}
        <Link
          className="community__action"
          to="#"
          onClick={(e) => openEditCommunityModal(e, community._id)}
        >
          <FaRegEdit className="actionIcon editIcon" />
        </Link>
        <Link
          className="community__action"
          to="#"
          onClick={(e) => openEditCommunityMembersModal(e, community._id)}
        >
          <FaUsersCog className="actionIcon editMembersIcon" />
        </Link>
      </div>
    </section>
  );
}
