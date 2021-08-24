import { default as CommunityProfile } from "./Sidebar/Profile.js";
import "./Sidebar.css";
import { default as CommunityGroupsList } from "./Sidebar/GroupsList.js";

export default function Sidebar(props) {
  //     function handleChange(event) {
  //       // Here, we invoke the callback with the new value
  //       props.onChange(event.target.value);
  //     }

  // onChange = { handleChange };

  return (
    <aside className={props.className}>
      <div className="SidebarHeader">
        <CommunityProfile community={props.community} />
      </div>

      <div className="SidebarContent">
        <CommunityGroupsList
          community={props.community}
          head="Default Groups"
          addClass="defaultGroups"
          currentGroup={props.currentGroup}
          onGroupChange={props.onGroupChange}
        />

        <CommunityGroupsList
          community={props.community}
          head="Custom Groups"
          addClass="customGroups"
          currentGroup={props.currentGroup}
          onGroupChange={props.onGroupChange}
        />
      </div>
    </aside>
  );
}
