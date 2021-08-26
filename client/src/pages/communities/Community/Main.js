import "./Main.css";
// import { FaRegCaretSquareRight } from "react-icons/fa";
import { FaCaretSquareRight } from "react-icons/fa";
import { Link } from "react-router-dom";

import GroupChat from "./Main/GroupChat";

export default function Main(props) {
  const { currentGroup } = props;

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
            {props.community?.name} ><strong>#{currentGroup.name}</strong>
          </span>
        </div>
      </section>
      <section className="MainContent">
        <GroupChat currentGroup={currentGroup} />
      </section>
    </section>
  );
}
