import "./Community.css";
import CommunityFallbackProfilePic from "../../assets/happy-students.jpg";
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

export default function Community({ community, as }) {
  console.log("yo community");
  // const renderAsListItem = as && as === "ListItem";
  // const communityProfilePicImgSrc = community?.picture
  //   ? community?.picture
  //   : CommunityFallbackProfilePic;
  const communityProfilePicImgSrc =
    community?.picture ?? CommunityFallbackProfilePic;

  // const history = useHistory();

  return (
    <section
      className={`Resource Community Community--${community.type} `}
      key={community.id}
      id={community.id}
    >
      {/* <p className="Community__ProfilePic-wrapper">
        <img
          src={communityProfilePicImgSrc}
          className="Community__ProfilePic"
          alt=""
        />
      </p>
      <div className="community__meta">
        <div>{community.name}</div>
        <div>{community.creator}</div>
      </div> */}
    </section>
  );
}
