import CommunityContext from "../../contexts/CommunityContext.js";
import { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import "./CommunityPage.css";

import { default as CommunitySidebar } from "./Community/Sidebar.js";
import { default as CommunityMain } from "./Community/Main.js";
import "./Community/media-queries.css";

export default function CommunityPage() {
  const { currentCommunity } = useContext(CommunityContext);
  const [currentGroup, setCurrentGroup] = useState(
    currentCommunity?.groups[0] || {}
  );
  const [sidebarToggled, setSidebarToggled] = useState(false);
  const [mediaQueryToggled, setMediaQueryToggled] = useState(false);
  const [sidebarStateClass, setSidebarStateClass] = useState(
    "CommunitySidebar"
  );

  const handleCurrentGroupChange = (e, newGroupId) => {
    if (currentCommunity?.groups) {
      setCurrentGroup(
        currentCommunity.groups.find(({ _id }) => {
          return _id === newGroupId;
        })
      );
    }
  };

  const handleMediaQueryChange = (matches) => {
    setMediaQueryToggled(!mediaQueryToggled);
  };

  const isSmallMobile = useMediaQuery(
    { maxWidth: 399 },
    undefined,
    handleMediaQueryChange
  );

  const isBiggerMobile = useMediaQuery(
    { minWidth: 400, maxWidth: 991 },

    undefined,
    handleMediaQueryChange
  );

  const isDesktop = useMediaQuery(
    { minWidth: 992 },
    undefined,
    handleMediaQueryChange
  );

  const toggleSidebar = () => {
    setSidebarToggled(!sidebarToggled);
  };

  useEffect(() => {
    let sidebarClass = "CommunitySidebar";

    if (isSmallMobile) {
      sidebarClass += sidebarToggled
        ? " CommunitySidebar--toggled CommunitySidebar--expanded"
        : " CommunitySidebar--hidden";
    } else if (isBiggerMobile) {
      sidebarClass += sidebarToggled
        ? " CommunitySidebar--toggled CommunitySidebar--expanded"
        : " CommunitySidebar--collapsed";
    } else if (isDesktop) {
      sidebarClass += sidebarToggled
        ? " CommunitySidebar--toggled CommunitySidebar--collapsed"
        : " CommunitySidebar--expanded";
    }

    setSidebarStateClass(sidebarClass);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sidebarToggled, mediaQueryToggled]);

  return (
    <>
      <CommunitySidebar
        className={sidebarStateClass}
        community={currentCommunity}
        currentGroup={currentGroup}
        onGroupChange={handleCurrentGroupChange}
      />

      <CommunityMain
        community={currentCommunity}
        currentGroup={currentGroup}
        onSidebarToggle={toggleSidebar}
      />
    </>
  );
}
