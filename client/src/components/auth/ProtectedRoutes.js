import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

export default function ProtectedRoutes(props) {
  const isAuthenticated = localStorage.getItem("auth-token");

  return (
    <Switch>
      {isAuthenticated ? props.children : <Redirect to="/login" />}
    </Switch>
  );
}
