import "./CommunityList.css";
import CommunityListItem from "./CommunityListItem.js";
import { Link } from "react-router-dom";

export default function CommunityList({ resources }) {
  function renderResources() {
    if (Array.isArray(resources) && resources.length) {
      return resources.map((community) => {
        return (
          <CommunityListItem
            community={community}
            as="ListItem"
            key={community._id}
          />
        );
      });
    } else {
      return (
        <div className="CollectionEmpty">
          <h2>Ups - looks like you didn't create any communities yet!</h2>

          <Link to="communities/new">
            <button className="btn rounded green">
              Create your first community!
            </button>
          </Link>
        </div>
      );
    }
  }

  return (
    <section className="ResourcesList CommunityList">
      <div className="ResourcesList__Items CommunityList__Items">
        {renderResources()}
      </div>
    </section>
  );
}
