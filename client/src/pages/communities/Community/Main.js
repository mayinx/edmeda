import "./Main.css";
import { FaRegCaretSquareRight } from "react-icons/fa";
import { FaCaretSquareRight } from "react-icons/fa";
// import { FaRegCaretSquareRight } from "react-icons/fa";
import { Link } from "react-router-dom";

// import Community from "../../../domain/Community/CommunityListItem";

export default function Main(props) {
  return (
    <section className="CommunityMain">
      <section className="MainHeader">
        {/* <button
          type="button"
          className="button small"
          onClick={props.onSidebarToggle}
        >
          Toggle Sidebar
        </button> */}

        <Link
          to="#"
          className="CommunityMainHeader__Item ToggleSidebarBtn"
          onClick={props.onSidebarToggle}
        >
          {/* <FaRegCaretSquareRight className="itemIcon sidebarToggleIcon" /> */}
          <FaCaretSquareRight className="itemIcon sidebarToggleIcon" />
          {/* <FaRegCaretSquareRight className="itemIcon sidebarToggleIcon" /> */}
          {/* <FaRegCaretSquareRight className="itemIcon sidebarToggleIcon" /> */}
        </Link>

        <div className="CommunityGroupLabel">
          <span className="GroupIcon"></span>
          <span className="GroupName">
            # Students @ {props.community?.name}
          </span>
        </div>
      </section>
      <section className="MainContent"></section>
    </section>
  );
}
