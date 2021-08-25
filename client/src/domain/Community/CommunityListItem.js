import "./CommunityListItem.css";
import CommunityFallbackProfilePic from "../../assets/happy-students.jpg";
import CommunitiesContext from "../../contexts/CommunitiesContext";

import { useContext } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import axios from "axios";

export default function Community({ community }) {
  const communityProfilePicImgSrc =
    community?.picture ?? CommunityFallbackProfilePic;

  const { communities, setCommunities } = useContext(CommunitiesContext);

  const history = useHistory();

  const removeResource = (e, id) => {
    e.stopPropagation();
    axios
      .delete(`api/communities/${id}`)
      .then((res) => {
        setCommunities(
          communities.filter((resource) => {
            return resource._id !== id;
          })
        );
        history.goBack();
      })
      .catch((err) => {
        console.log(
          "Failed to delete community resource - something went wrong: ",
          err
        );
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

  return (
    <section
      className={`Resource Community Community--${community.type} ResourceListItem CommunityListItem CommunityListItem--${community.type} `}
      key={community._id}
      id={community._id}
      onClick={(e) => openCommunityPage(e, community._id)}
    >
      <p className="Community__ProfilePic-wrapper">
        <img
          src={communityProfilePicImgSrc}
          className="Community__ProfilePic"
          alt=""
        />
      </p>
      <div className="community__meta">
        <div className="truncate">{community.name}</div>
        <div className="truncate">{community.creator}</div>
      </div>
      <div className="community__actions">
        <Link
          className="community__action"
          to="#"
          onClick={(e) => removeResource(e, community._id)}
        >
          <FaTrashAlt className="actionIcon deleteIcon" />
        </Link>
        <Link
          className="community__action"
          to="#"
          onClick={(e) => openEditCommunityModal(e, community._id)}
        >
          <FaRegEdit className="actionIcon editIcon" />
        </Link>
      </div>
    </section>
  );
}
