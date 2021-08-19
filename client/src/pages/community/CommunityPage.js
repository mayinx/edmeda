// import Community from "../../domain/Community/Community.js";
import CommunityContext from "../../contexts/CommunityContext.js";
import { useContext, useState } from "react";

import { default as CommunityProfile } from "../../domain/Community/Profile.js";

export default function CommunityPage() {
  const { currentCommunity } = useContext(CommunityContext);
  const { sidebarCollapsed, setSidebarCollapsed } = useState(false);

  // togglred, expanded, none / invisble

  const [toggled, setToggled] = useState(false);

  const onSidebarToggle = () => {
    setToggled(!toggled);
  };

  return (
    <>
      <sidebar
        className={`CommunitySidebar ${
          toggled ? "CommunitySidebar--toggled" : null
        }`}
      >
        <div className="CommunitySidebar__CommunityHeader">
          <CommunityProfile community={currentCommunity} />
        </div>

        <div className="CommunitySidebar__CommunityGroups"></div>
      </sidebar>
      <section className="CommunityMain">
        <section className="CommunityMain__Header">
          <button
            type="button"
            className="button small"
            onClick={onSidebarToggle}
          >
            Toggle Menu
          </button>
          <div className="CommunityGroupLabel">
            <span className="GroupIcon"></span>
            <span className="GroupName">Students</span>
          </div>
        </section>
        <section className="CommunityMain__Content"></section>
      </section>
    </>
  );
}
