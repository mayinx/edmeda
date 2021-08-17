import "./Community.css";
import CommunityFallbackProfilePic from "../../assets/happy-students.jpg";
import "./Profile.css";
import { FaUserAlt } from "react-icons/fa";
import { FaDotCircle } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
// import CommunitiesContext from "../../contexts/CommunitiesContext";

// import { useContext } from "react";
import { useHistory } from "react-router";

// import { Link } from "react-router-dom";
// import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
// import axios from "axios";

// TODO: Get rid of that conditional wrapper again - should be possible to
// just set an onLick-handler on the section-tag itself and basta kanzla!
// const ConditionalWrapper = ({ condition, wrapper, children }) =>
//   condition ? wrapper(children) : children;

export default function Profile({ community }) {
  const communityProfilePicImgSrc =
    community?.picture ?? CommunityFallbackProfilePic;

  return (
    <section
      className={`CommunityProfile CommunityProfile--${community.type} `}
      key={community.id}
      id={community.id}
    >
      <h3 className="CommunityProfile__CommunityName">
        <div>{community.name}</div>
      </h3>
      <p className="CommunityProfile__Image--wrapper">
        <img
          src={communityProfilePicImgSrc}
          className="CommunityProfile__Image"
          alt=""
        />
      </p>

      <h3 className="CommunityProfile__CommunityName">
        <div>{community.name}</div>
      </h3>

      <ul className="CommunityProfile__CommunityMeta">
        <li>
          <FaUserAlt className="CommunityMeta__Icon" />
          <div>
            <span className="CommunityMeta__Caption">Creator: </span>
            {community.creator}
          </div>
        </li>
        <li>
          <FaUsers className="CommunityMeta__Icon" />
          <div>
            <span className="CommunityMeta__Caption">Members: </span>32 |
          </div>{" "}
          <FaDotCircle className="OnlineIcon" />
          <div>
            <span className="CommunityMeta__Caption">Online: </span>15
          </div>
        </li>
        <li>
          <FaUserAlt className="CommunityMeta__Icon" />
          <div>
            <span className="CommunityMeta__Caption">Students: </span>28 |{" "}
            <span className="CommunityMeta__Caption">Online: </span>13
          </div>
        </li>
        <li>
          <FaUserAlt className="CommunityMeta__Icon" />
          <div>
            <span className="CommunityMeta__Caption">Students: </span>28 |{" "}
            <span className="CommunityMeta__Caption">Online: </span>13
          </div>
        </li>
      </ul>
    </section>
  );
}
