import "./App.css";
import { Switch, Redirect, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";

//  TODO: Ok - okei: Switch to redux already ;-)
import CurrentUserContext from "../../contexts/CurrentUserContext";
import CommunitiesContext from "../../contexts/CommunitiesContext";
import ModalContext from "../../contexts/ModalContext";

import RegistrationLayout from "../../layouts/public/RegistrationLayout";
import CommunityLayout from "../../layouts/private/CommunityLayout.js";
import CommunitiesLayout from "../../layouts/private/CommunitiesLayout";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../notifications/ReactToastifyOverrides.css";
import ProtectedRoutes from "../auth/ProtectedRoutes";
import authHeader from "../../services/auth-header";

function App() {
  const [currentUserData, setCurrentUserData] = useState({
    token: undefined,
    user: undefined,
  });
  const [communities, setCommunities] = useState([]);

  // TODO Refactor
  const checkLoggedIn = async () => {
    try {
      let token = localStorage.getItem("auth-token");

      if (token === null) {
        localStorage.setItem("auth-token", "");
        localStorage.removeItem("current-user");
        token = "";
      }

      const validationResp = await axios.post(
        "/api/users/validateToken",
        null,
        { headers: authHeader() }
      );

      if (validationResp.data && validationResp.data.validToken) {
        setCurrentUserData({
          token: validationResp.data.token,
          user: validationResp.data.user,
        });
      }
    } catch (err) {
      console.log("-- checkLoggedInError: ", err);
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  useEffect(() => {
    axios
      .get("/api/communities", { headers: authHeader() })
      .then((res) => {
        setCommunities(res.data || []);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentUserData.token]);

  const [modalOpen, setModalOpen] = useState();

  return (
    <ModalContext.Provider value={{ modalOpen, setModalOpen }}>
      <div className={`App ${modalOpen ? "App--modalOpened" : ""}`}>
        <CurrentUserContext.Provider
          value={{ currentUserData, setCurrentUserData }}
        >
          <CommunitiesContext.Provider value={{ communities, setCommunities }}>
            <Switch>
              <Route exact path="/" component={RegistrationLayout} />
              <Route path="/register" component={RegistrationLayout} />
              <Route path="/login" component={RegistrationLayout} />
              <ProtectedRoutes>
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
                <Route
                  exact
                  path="/communities/:id/members"
                  component={CommunitiesLayout}
                />
                <Route
                  exact
                  path="/communities/:id"
                  component={CommunityLayout}
                />
                <Route path="/communities" component={CommunitiesLayout} />
              </ProtectedRoutes>
              <Route path="*">
                <h2>404 - Sorry, but this page could not be found!</h2>
              </Route>
            </Switch>
            <ToastContainer
              enableMultiContainer
              containerId={"appNotificationCnt"}
              position="top-left"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </CommunitiesContext.Provider>
        </CurrentUserContext.Provider>
      </div>
    </ModalContext.Provider>
  );
}

export default App;
