import React from "react";
import { Redirect, Route } from "react-router-dom";

export default function ProtectedRoutes(props) {
  const isAuthenticated = localStorage.getItem("auth-token");

  return isAuthenticated ? props.children : <Redirect to="/login" />;
}
