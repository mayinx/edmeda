// import Community from "../../domain/Community/Community.js";
import CommunityContext from "../../contexts/CommunityContext.js";
import { useContext, useState } from "react";

import "./CommunityPage.css";

import { default as CommunitySidebar } from "./Community/Sidebar.js";
import { default as CommunityMain } from "./Community/Main.js";
import "./Community/media-queries.css";

export default function CommunityPage() {
  const { currentCommunity } = useContext(CommunityContext);
  // states: expanded - collapsed - hidden
  const [toggled, setToggled] = useState(false);

  const toggleSidebar = () => {
    setToggled(!toggled);
  };

  return (
    <>
      <CommunitySidebar
        className={`CommunitySidebar ${
          toggled ? "CommunitySidebar--toggled" : null
        }`}
        community={currentCommunity}
      />

      <CommunityMain
        community={currentCommunity}
        onSidebarToggle={toggleSidebar}
      />
    </>
  );
}
