import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

export default function ProtectedRoutes(props) {
  const user = JSON.parse(localStorage.getItem("current-user"));
  const isAuthenticated = user && user.token;

  return (
    <Switch>
      {isAuthenticated ? props.children : <Redirect to="/login" />}
    </Switch>
  );
}
