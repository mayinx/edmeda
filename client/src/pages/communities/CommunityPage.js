// import Community from "../../domain/Community/Community.js";
import CommunityContext from "../../contexts/CommunityContext.js";
import { useContext, useState } from "react";

import "./CommunityPage.css";

import { default as CommunitySidebar } from "./Community/Sidebar.js";
import { default as CommunityMain } from "./Community/Main.js";
import "./Community/media-queries.css";

export default function CommunityPage() {
  const { currentCommunity } = useContext(CommunityContext);
  // states: hidden - collapsed - expanded
  const [toggled, setToggled] = useState(false);

  // TODO: REFACTORING: Check responsive react hook or something to produce
  // three different state-specific css-classes here:
  // 'CommunitySidebar--hidden', 'CommunitySidebar--collaped' + 'CommunitySidebar--expanded'
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
