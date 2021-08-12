import "./Community.css";
import { Link } from "react-router-dom";

import CommunityFallbackProfilePic from "../../assets/happy-students.jpg";

import { FaRegEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";

// TODO: Move that beauty here somewhere generic - dunno: 'src/Utils' f.i. - or iplemen it as useConditionalWrapper-custom hook or whatnot?
const ConditionalWrapper = ({ condition, wrapper, children }) =>
  condition ? wrapper(children) : children;

export default function Community({ community, as }) {
  const renderAsListItem = as && as === "ListItem";
  const communityProfilePicImgSrc = community?.picture
    ? community?.picture
    : CommunityFallbackProfilePic;

  const removeResource = (id) => {
    axios
      .delete(`api/communities/${id}`)
      .then((res) => {
        console.log("Yohooo - deleted");
        window.location = "/";
      })
      .catch((err) => {
        console.log(err);
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
