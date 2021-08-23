import "./CommunityListItem.css";
import CommunityFallbackProfilePic from "../../assets/happy-students.jpg";
import CommunitiesContext from "../../contexts/CommunitiesContext";

import { useContext } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import axios from "axios";

// TODO: Get rid of that conditional wrapper again - shoudl be possible to just set an onLick-handler on the section-tag itself and basrta kanzla!
const ConditionalWrapper = ({ condition, wrapper, children }) =>
  condition ? wrapper(children) : children;

export default function Community({ community, as }) {
  console.log("yo community");
  const renderAsListItem = as && as === "ListItem";
  const communityProfilePicImgSrc =
    community?.picture ?? CommunityFallbackProfilePic;

  const { communities, setCommunities } = useContext(CommunitiesContext);

  const history = useHistory();

  const removeResource = (id) => {
    axios
      .delete(`api/communities/${id}`)
      .then((res) => {
        setCommunities(
          communities.filter((resource) => {
            return resource._id !== id;
          })
        );
        // history.push("/");
        history.goBack();
      })
      .catch((err) => {
        console.log(
          "Failed to delete community resource - something went wrong: ",
          err
        );
      });
  };

  return (
    <section
      className={`Resource Community Community--${community.type} ${
        renderAsListItem && "Resource__ListItem Community__ListItem"
      }`}
      key={community.id}
      id={community.id}
    >
      <ConditionalWrapper
        condition={renderAsListItem}
        wrapper={(children) => (
          <Link to={`/communities/${community._id}`}>{children}</Link>
        )}
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
            onClick={() => removeResource(community._id)}
          >
            <FaTrashAlt className="actionIcon deleteIcon" />
          </Link>
          <Link
            className="community__action"
            to={`communities/edit/${community._id}`}
          >
            <FaRegEdit className="actionIcon editIcon" />
          </Link>
        </div>
      </ConditionalWrapper>
    </section>
  );
}
