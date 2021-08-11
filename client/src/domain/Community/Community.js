import "./Community.css";
import { Link } from "react-router-dom";

import CommunityFallbackProfilePic from "../../assets/stock-vector-college-or-university-students-group-young-happy-people-standing-isolated-on-white-background-1856929843.jpg";

// TODO: Move that beauty here somewhere generic - dunno: 'src/Utils' f.i. - or iplemen it as useConditionalWrapper-custom hook or whatnot?
const ConditionalWrapper = ({ condition, wrapper, children }) =>
  condition ? wrapper(children) : children;

export default function Community({ community, as }) {
  const renderAsListItem = as && as === "ListItem";
  const communityProfilePicImgSrc = community?.picture
    ? community?.picture
    : CommunityFallbackProfilePic;

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
      </ConditionalWrapper>
    </section>
  );
}
