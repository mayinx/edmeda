import "./App.css";
import { Switch, Route, NavLink } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import AppHeader from "./AppHeader.js";

import MyCommunitiesPage from "../../pages/MyCommunitiesPage.js";

import CommunitiesContext from "../../contexts/CommunitiesContext";

import Modal from "../modal/Modal.js";
import NewCommunityModalPage from "../../pages/NewCommunityModalPage.js";

function App() {
  const [resources, setResources] = useState([]);

  const primaryAddActionFormId = "newCommunity";

  useEffect(() => {
    console.log("yohooo effect");
    axios
      .get("/api/communities")
      .then((res) => {
        setResources(res.data || []);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <CommunitiesContext.Provider value={{ resources, setResources }}>
        <Route
          path="/newCommunity"
          render={() => {
            return (
              <Modal
                modalCaption="NewCommunity"
                crudAction="create"
                formId={primaryAddActionFormId}
              >
                <NewCommunityModalPage formId={primaryAddActionFormId} />
              </Modal>
            );
          }}
        />

        <AppHeader />
        <main>
          <Switch>
            <Route path="/" component={MyCommunitiesPage} />
            <Route path="*">
              <h2>404 - Sorry, but this page could not be found!</h2>
            </Route>
          </Switch>
        </main>
      </CommunitiesContext.Provider>
    </div>
  );
}

export default App;
