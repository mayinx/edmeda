import CommunityContext from "../../contexts/CommunityContext.js";
import { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import "./CommunityPage.css";

import { default as CommunitySidebar } from "./Community/Sidebar.js";
import { default as CommunityMain } from "./Community/Main.js";
import "./Community/media-queries.css";

export default function CommunityPage() {
  const { currentCommunity } = useContext(CommunityContext);
  const [sidebarToggled, setSidebarToggled] = useState(false);
  const [mediaQueryToggled, setMediaQueryToggled] = useState(false);
  const [sidebarStateClass, setSidebarStateClass] = useState(
    "CommunitySidebar"
  );

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
  }, [sidebarToggled, mediaQueryToggled]);

  return (
    <>
      <CommunitySidebar
        className={sidebarStateClass}
        community={currentCommunity}
      />

      <CommunityMain
        community={currentCommunity}
        onSidebarToggle={toggleSidebar}
      />
    </>
  );
}
