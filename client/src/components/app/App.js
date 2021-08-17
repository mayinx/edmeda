import "./App.css";
import { Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";

import CommunityLayout from "../../layouts/CommunityLayout.js";
import CommunitiesLayout from "../../layouts/CommunitiesLayout";
import CommunitiesContext from "../../contexts/CommunitiesContext";

function App() {
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    axios
      .get("/api/communities")
      .then((res) => {
        setCommunities(res.data || []);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <CommunitiesContext.Provider value={{ communities, setCommunities }}>
        <Switch>
          <Route path="/communities/:id" component={CommunityLayout} />
          <Route path="/" component={CommunitiesLayout} />
          <Route path="*">
            <h2>404 - Sorry, but this page could not be found!</h2>
          </Route>
        </Switch>
      </CommunitiesContext.Provider>
    </div>
  );
}

export default App;
