import "./App.css";
import { Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";

import Register from "../../components/auth/Register";
import Login from "../../components/auth/Login";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import CommunityLayout from "../../layouts/CommunityLayout.js";
import CommunitiesLayout from "../../layouts/CommunitiesLayout";
import CommunitiesContext from "../../contexts/CommunitiesContext";

function setToken(userToken) {}

function getToken() {}

function App() {
  const [currentUserData, setCurrentUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      console.log("[CLIENT] checkLoggedIn");
      console.log("--- currentUserData: ", currentUserData);
      let token = localStorage.getItem("auth-token");
      console.log("--- fetching token from localStorage - token: ", token);
      if (token === null) {
        console.log(
          "--- TOKEN NULL - setting localStorage auth-token to empty string",
          localStorage
        );
        localStorage.setItem("auth-token", "");
        token = "";
      }
      console.log("--- validate token on server");
      // TODO: Why post-request?
      const validationResp = await axios.post(
        "/api/users/validateToken",
        null,
        {
          headers: { "x-auth-token": token },
        }
      );
      console.log("--- server side token validation performed");
      console.log("--- validationResp: ", validationResp);
      if (validationResp.data && validationResp.data.validToken) {
        console.log("--- TOKEN IS VALID AND STORED IN CURRENTUSERDATA!!");
        // const userRes = await axios.get("/api/users/current", {
        //   headers: { "x-auth-token": token },
        // });
        // setCurrentUserData({
        //   token,
        //   user: userRes.data,
        // });
        setCurrentUserData({
          token: validationResp.data.token,
          user: validationResp.data.user,
        });
      }
    };
    checkLoggedIn();
  }, []);

  const token = getToken();

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
      <CurrentUserContext.Provider
        value={{ currentUserData, setCurrentUserData }}
      >
        <CommunitiesContext.Provider value={{ communities, setCommunities }}>
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route
              exact
              path="/communities/new"
              component={CommunitiesLayout}
            />
            <Route
              exact
              path="/communities/:id/edit"
              component={CommunitiesLayout}
            />
            <Route exact path="/communities/:id" component={CommunityLayout} />
            <Route path="/" component={CommunitiesLayout} />
            <Route path="*">
              <h2>404 - Sorry, but this page could not be found!</h2>
            </Route>
          </Switch>
        </CommunitiesContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
