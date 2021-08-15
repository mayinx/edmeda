import "./App.css";
import { Switch, Route } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import AppHeader from "./AppHeader.js";

import MyCommunitiesPage from "../../pages/community/MyCommunitiesPage.js";
import NewCommunityPage from "../../pages/community/NewCommunityPage.js";
import EditCommunityPage from "../../pages/community/EditCommunityPage.js";
import CommunitiesContext from "../../contexts/CommunitiesContext";
import Modal from "../modal/Modal.js";

function App() {
  const [communities, setCommunities] = useState([]);

  const ADD_ACTION_FORM_ID = "newCommunity";
  const UPDATE_ACTION_FORM_ID = "editCommunity";

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
        <Route
          path="/newCommunity"
          render={() => {
            return (
              <Modal
                modalCaption="New Community"
                crudAction="create"
                formId={ADD_ACTION_FORM_ID}
              >
                <NewCommunityPage formId={ADD_ACTION_FORM_ID} />
              </Modal>
            );
          }}
        />
        <Route
          path="/editCommunity/:id"
          render={() => {
            return (
              <Modal
                modalCaption="Edit Community"
                crudAction="update"
                formId={UPDATE_ACTION_FORM_ID}
              >
                <EditCommunityPage formId={UPDATE_ACTION_FORM_ID} />
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
