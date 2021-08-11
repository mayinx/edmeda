import "./App.css";
import { Switch, Route, NavLink } from "react-router-dom";
import AppHeader from "./AppHeader.js";

import MyCommunitiesPage from "../../pages/MyCommunitiesPage.js";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <main>
        <Switch>
          <Route path="/" component={MyCommunitiesPage} />
          <Route path="*">
            <h2>404 - Sorry, but this page could not be found!</h2>
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
