import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

export default function ProtectedRoutes(props) {
  const isAuthenticated = localStorage.getItem("auth-token");

  // {localStorage.getItem("auth-token") ? (
  //   <>
  //     <Route
  //       exact
  //       path="/communities/new"
  //       component={CommunitiesLayout}
  //     />
  //     <Route
  //       exact
  //       path="/communities/:id/edit"
  //       component={CommunitiesLayout}
  //     />
  //     <Route
  //       exact
  //       path="/communities/:id/members"
  //       component={CommunitiesLayout}
  //     />
  //     <Route
  //       exact
  //       path="/communities/:id"
  //       component={CommunityLayout}
  //     />

  //     {/* <Route path="/" component={CommunitiesLayout} /> */}
  //     <Route path="/communities" component={CommunitiesLayout} />
  //   </>
  // ) : (
  //   <Redirect to="/login" />
  // )}

  return (
    <Switch>
      {isAuthenticated ? props.children : <Redirect to="/login" />}
    </Switch>
  );
}
