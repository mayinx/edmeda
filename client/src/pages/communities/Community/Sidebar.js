import { default as CommunityProfile } from "./Sidebar/Profile.js";
import "./Sidebar.css";

export default function Sidebar(props) {
  return (
    <sidebar className={props.className}>
      <div className="CommunitySidebar__CommunityHeader">
        <CommunityProfile community={props.community} />
      </div>

      <div className="CommunitySidebar__CommunityGroups"></div>
    </sidebar>
  );
}
