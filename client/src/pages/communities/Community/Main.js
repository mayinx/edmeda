import "./Main.css";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
// import Community from "../../../domain/Community/CommunityListItem";

export default function Main(props) {
  return (
    <section className="CommunityMain">
      <section className="CommunityMain__Header">
        {/* <button
          type="button"
          className="button small"
          onClick={props.onSidebarToggle}
        >
          Toggle Sidebar
        </button> */}

        <Link
          to="#"
          className="CommunityMainHeader__Item"
          onClick={props.onSidebarToggle}
        >
          <FaUserAlt className="itemIcon sidebarToggleIcon" />
        </Link>

        <div className="CommunityGroupLabel">
          <span className="GroupIcon"></span>
          <span className="GroupName">
            # Students @ {props.community?.name}
          </span>
        </div>
      </section>
      <section className="CommunityMain__Content"></section>
    </section>
  );
}
