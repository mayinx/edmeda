import Community from "../../domain/Community/Community.js";
import CommunityContext from "../../contexts/CommunityContext.js";
import { useContext } from "react";

import { default as CommunityProfile } from "../../domain/Community/Profile.js";

export default function CommunityPage() {
  const { currentCommunity } = useContext(CommunityContext);

  return (
    <>
      <sidebar className="CommunitySidebar">
        <div className="CommunitySidebar__CommunityHeader">
          <CommunityProfile community={currentCommunity} />
        </div>

        <div className="CommunitySidebar__CommunityGroups"></div>
      </sidebar>
      <section className="CommunityContentArea"></section>
    </>
  );
}
