import "./Community.css";
import { Link } from "react-router-dom";

import CommunityFallbackProfilePic from "../../assets/happy-students.jpg";

import { FaRegEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";

import CommunitiesContext from "../../contexts/CommunitiesContext";
import { useContext } from "react";

import { useHistory } from "react-router";

// TODO: Get rid of that conditional wrapper again - shoudl be possible to just set an onLick-handler on the section-tag itself and basrta kanzla!
const ConditionalWrapper = ({ condition, wrapper, children }) =>
  condition ? wrapper(children) : children;

export default function Community({ community, as }) {
  const renderAsListItem = as && as === "ListItem";
  const communityProfilePicImgSrc = community?.picture
    ? community?.picture
    : CommunityFallbackProfilePic;

  const { resources, setResources } = useContext(CommunitiesContext);

  const history = useHistory();

  const removeResource = (id) => {
    axios
      .delete(`api/communities/${id}`)
      .then((res) => {
        setResources(
          resources.filter((resource) => {
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
          <div>{community.name}</div>
          <div>{community.creator}</div>
        </div>
        <div className="community__actions">
          <Link
            className="community__action"
            to="#"
            onClick={() => removeResource(community._id)}
          >
            <FaTrashAlt className="actionIcon deleteIcon" />
          </Link>
          <Link className="community__action" to="/editCommunity">
            <FaRegEdit className="actionIcon editIcon" />
          </Link>
        </div>
      </ConditionalWrapper>
    </section>
  );
}