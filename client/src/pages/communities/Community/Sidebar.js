import { default as CommunityProfile } from "./Sidebar/Profile.js";
import "./Sidebar.css";
import { default as CommunityGroupsList } from "./Sidebar/GroupsList.js";

export default function Sidebar(props) {
  return (
    <aside className={props.className}>
      <div className="SidebarHeader">
        <CommunityProfile community={props.community} />
      </div>

      <div className="SidebarContent">
        <CommunityGroupsList
          community={props.community}
          groups={props.community.groups.filter((group) => {
            return group.type === "default";
          })}
          head="Default Groups"
          addClass="defaultGroups"
          currentGroup={props.currentGroup}
          onGroupChange={props.onGroupChange}
        />

        <CommunityGroupsList
          community={props.community}
          groups={props.community.groups.filter((group) => {
            return group.type === "custom";
          })}
          head="Custom Groups"
          addClass="customGroups"
          currentGroup={props.currentGroup}
          onGroupChange={props.onGroupChange}
        />
      </div>
    </aside>
  );
}
