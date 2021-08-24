import { default as CommunityProfile } from "./Sidebar/Profile.js";
import "./Sidebar.css";

// import { FaCaretSquareRight } from "react-icons/fa";
// import { FaRegCaretSquareRight } from "react-icons/fa";
import { FaCaretRight } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";

export default function Sidebar(props) {
  return (
    <aside className={props.className}>
      <div className="SidebarHeader">
        <CommunityProfile community={props.community} />
      </div>

      <div className="SidebarContent">
        <ol className="CommunityGroupsList defaultGroups">
          <li className="CommunityGroupsList--Header">
            <span className="headerGroupIconWrap">
              <FaUsers className="headerGroupIcon" />
            </span>
            <span className="groupTypeName">Default Groups</span>
          </li>
          <li className="CommunityGroupsList--Item">
            <span className="groupName">Community</span>
            <span className="openGroupIconWrap">
              <FaCaretRight />
            </span>
          </li>
          <li className="CommunityGroupsList--Item">
            <span className="groupName">Students</span>
            <span className="openGroupIconWrap">
              <FaCaretRight />
            </span>
          </li>
          <li className="CommunityGroupsList--Item">
            <span className="groupName">Teachers</span>
            <span className="openGroupIconWrap">
              <FaCaretRight />
            </span>
          </li>
          <li className="CommunityGroupsList--Item">
            <span className="groupName">Parents</span>
            <span className="openGroupIconWrap">
              <FaCaretRight />
            </span>
          </li>
        </ol>
        <ol className="CommunityGroupsList customGroups">
          <li className="CommunityGroupsList--Item">
            <span className="groupName">Mathe</span>
          </li>
          <li className="CommunityGroupsList--Item">
            <span className="groupName">Deutsch</span>
          </li>
          <li className="CommunityGroupsList--Item">
            <span className="groupName">Englisch</span>
          </li>
          <li className="CommunityGroupsList--Item">
            <span className="groupName">Informatik</span>
          </li>
        </ol>
      </div>
    </aside>
  );
}
