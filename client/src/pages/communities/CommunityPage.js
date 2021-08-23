// import Community from "../../domain/Community/Community.js";
import CommunityContext from "../../contexts/CommunityContext.js";
import { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import "./CommunityPage.css";

import { default as CommunitySidebar } from "./Community/Sidebar.js";
import { default as CommunityMain } from "./Community/Main.js";
import "./Community/media-queries.css";

export default function CommunityPage() {
  const { currentCommunity } = useContext(CommunityContext);
  // states: hidden - collapsed - expanded
  const [sidebarToggled, setSidebarToggled] = useState(false);
  const [mediaQueryToggled, setMediaQueryToggled] = useState(false);
  const [sidebarStateClass, setSidebarStateClass] = useState(
    "CommunitySidebar"
  );

  const handleMediaQueryChange = (matches) => {
    // matches will be true or false based on the value for the media query
    console.log("Media Query Change");

    setMediaQueryToggled(!mediaQueryToggled);
  };

  const isSmallMobile = useMediaQuery(
    // { query: "(max-width: 399px)" }
    { maxWidth: 399 },
    undefined,
    handleMediaQueryChange
  );

  /* from here on (up until min-width: 992px / i.e. large screens)
   the sidebar is always visible:
   - default / untoggled: sidebar collapsed to (always visible) min bar
   - toggled: sidebar expanded to max width
*/
  const isBiggerMobile = useMediaQuery(
    // { query: "(min-width: 400px)" }
    { minWidth: 400, maxWidth: 991 },

    undefined,
    handleMediaQueryChange
  );

  /* from here on the sidebar is always visible as well - but:
   - default / untoggled: sidebar expanded to max width per default
   - toggled: collapsed to (always visible) min bar
*/
  const isDesktop = useMediaQuery(
    // { query: "(min-width: 992px)" }
    { minWidth: 992 },
    undefined,
    handleMediaQueryChange
  );

  // TODO: REFACTORING: Check responsive react hook or something to produce
  // three different state-specific css-classes here:
  // 'CommunitySidebar--hidden', 'CommunitySidebar--collaped' + 'CommunitySidebar--expanded'
  const toggleSidebar = () => {
    setSidebarToggled(!sidebarToggled);
  };

  useEffect(() => {
    let sidebarClass = "CommunitySidebar";
    console.log("useEffect");
    console.log("toggled", sidebarToggled);
    console.log("isSmallMobile", isSmallMobile);
    console.log("isBiggerMobile", isBiggerMobile);
    console.log("isDesktop", isDesktop);

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

    console.log("new sidebarClass: ", sidebarClass);
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
