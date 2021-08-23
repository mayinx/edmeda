import { default as CommunityProfile } from "./Sidebar/Profile.js";
import "./Sidebar.css";

export default function Sidebar(props) {
  return (
    <sidebar className={props.className}>
      <div className="SidebarHeader">
        <CommunityProfile community={props.community} />
      </div>

      <div className="SidebarContent">
        <ol className="CommunityGroupsList defaultGroups">
          <li>
            <span className="groupName">Community</span>
          </li>
          <li>
            <span className="groupName">Students</span>
          </li>
          <li>
            <span className="groupName">Teachers</span>
          </li>
          <li>
            <span className="groupName">Parents</span>
          </li>
        </ol>
        <ol className="CommunityGroupsList customGroups">
          <li>
            <span className="groupName">Mathe</span>
          </li>
          <li>
            <span className="groupName">Deutsch</span>
          </li>
          <li>
            <span className="groupName">Englisch</span>
          </li>
          <li>
            <span className="groupName">Informatik</span>
          </li>
        </ol>
      </div>
    </sidebar>
  );
}
