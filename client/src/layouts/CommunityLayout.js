import { useState } from "react";
import { Route, Switch } from "react-router-dom";
import AppHeader from "../components/app/AppHeader";
import CommunityPage from "../pages/community/CommunityPage";
import "./CommunityLayout.css";

export default function CommunityLayout() {
  // TODO: set currentcommunity here instead!
  const [currentCommunity, setCurrentCommunity] = useState(null);

  return (
    <>
      <AppHeader className="CommunityHeader" />
      <main className="CommunityLayout">
        <sidebar className="CommunitySidebar">
          <div className="CommunitySidebar__CommunityProfile"></div>
          <div className="CommunitySidebar__CommunityGroups"></div>
        </sidebar>
        <section className="CommunityContentArea"></section>
        <Switch>
          <Route exact path="/" component={CommunityPage} />
        </Switch>
      </main>
    </>
  );
}
