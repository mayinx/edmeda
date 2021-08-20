import { default as CommunityProfile } from "./Sidebar/Profile.js";
import "./Sidebar.css";

export default function Sidebar(props) {
  return (
    <sidebar className={props.className}>
      <div className="SidebarHeader">
        <CommunityProfile community={props.community} />
      </div>

      <div className="SidebarContent"></div>
    </sidebar>
  );
}
