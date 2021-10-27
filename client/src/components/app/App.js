import "./App.css";
import { Switch, Route } from "react-router-dom";
import { useState } from "react";

import ModalContext from "../../contexts/ModalContext";

import RegistrationLayout from "../../layouts/public/RegistrationLayout";
import CommunityLayout from "../../layouts/private/CommunityLayout.js";
import CommunitiesLayout from "../../layouts/private/CommunitiesLayout";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../notifications/ReactToastifyOverrides.css";
import ProtectedRoutes from "../auth/ProtectedRoutes";

function App() {
  const [modalOpen, setModalOpen] = useState();

  return (
    <ModalContext.Provider value={{ modalOpen, setModalOpen }}>
      <div className={`App ${modalOpen ? "App--modalOpened" : ""}`}>
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
            <Route exact path="/communities/:id" component={CommunityLayout} />
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
      </div>
    </ModalContext.Provider>
  );
}

export default App;
