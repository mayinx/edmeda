import "./UserList.css";
import UserListItem from "./UserListItem.js";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";

export default function UserList(props) {
  const { community, communityMembers, setCommunityMembers } = props;
  function renderResources() {
    if (Array.isArray(communityMembers) && communityMembers.length) {
      return communityMembers.map((user) => {
        return (
          <UserListItem
            user={user}
            key={user._id}
            community={community}
            communityMembers={communityMembers}
            setCommunityMembers={setCommunityMembers}
          />
        );
      });
    } else {
      return (
        <ReactLoading
          type={"bars"}
          color={"#9773a7"}
          height={100}
          width={100}
          className="PageLoadingAnimation"
        />
        // <div className="CollectionEmpty">
        //   <h2>Ups - looks like you didn't create any users yet!</h2>

        //   <Link to="communities/new">
        //     <button className="btn rounded green">
        //       Create your first user!
        //     </button>
        //   </Link>
        // </div>
      );
    }
  }

  return (
    <section className="ResourcesList UserList">
      <div className="ResourcesList__Items UserList__Items">
        {renderResources()}
      </div>
    </section>
  );
}
