import "./Main.css";
import { FaRegCaretSquareRight } from "react-icons/fa";
import { FaCaretSquareRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Main(props) {
  return (
    <section className="CommunityMain">
      <section className="MainHeader">
        <Link
          to="#"
          className="CommunityMainHeader__Item ToggleSidebarBtn"
          onClick={props.onSidebarToggle}
        >
          <FaCaretSquareRight className="itemIcon sidebarToggleIcon" />
        </Link>

        <div className="CommunityGroupLabel">
          <span className="GroupIcon"></span>
          <span className="GroupName">
            {props.community?.name} >{" "}
            <strong>#{props?.currentGroup?.name}</strong>
          </span>
        </div>
      </section>
      <section className="MainContent">
        <h3>Group Chat #{props?.currentGroup?.name}</h3>
      </section>
    </section>
  );
}
