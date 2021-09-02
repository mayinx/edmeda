import "./UserList.css";
import UserListItem from "./UserListItem.js";
import { Link } from "react-router-dom";

export default function UserList({ resources }) {
  function renderResources() {
    if (Array.isArray(resources) && resources.length) {
      return resources.map((user) => {
        return <UserListItem user={user} key={user._id} />;
      });
    } else {
      return (
        <div className="CollectionEmpty">
          <h2>Ups - looks like you didn't create any users yet!</h2>

          <Link to="communities/new">
            <button className="btn rounded green">
              Create your first user!
            </button>
          </Link>
        </div>
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
