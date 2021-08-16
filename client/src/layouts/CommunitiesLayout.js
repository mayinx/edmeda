import { Route, Switch } from "react-router-dom";
import AppHeader from "../components/app/AppHeader";
import MyCommunitiesPage from "../pages/community/MyCommunitiesPage";
import "./CommunitiesLayout.css";

export default function CommunitiesLayout() {
  return (
    <>
      <AppHeader className="CommunitiesHeader" />
      <main className="CommunitiesLayout">
        <Switch>
          <Route exact path="/" component={MyCommunitiesPage} />
        </Switch>
      </main>
    </>
  );
}
