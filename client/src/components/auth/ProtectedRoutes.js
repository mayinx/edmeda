import React, { useEffect, useState } from "react";
import { Redirect, Switch } from "react-router-dom";
import AuthService from "../../services/auth";

import CommunitiesContext from "../../contexts/CommunitiesContext";
import UserDataService from "../../services/user";
import useNotify from "../notifications/useNotify";

export default function ProtectedRoutes(props) {
  const [communities, setCommunities] = useState([]);
  const { notifyError } = useNotify();

  useEffect(() => {
    if (AuthService.loggedIn()) {
      UserDataService.communities()
        .then((res) => {
          setCommunities(res.data || []);
        })
        .catch((err) => {
          notifyError({
            title: "Communities not accessible",
            message: `Your communities can't be accessed - an error occured: ${err}`,
          });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CommunitiesContext.Provider value={{ communities, setCommunities }}>
      <Switch>
        {AuthService.loggedIn() ? props.children : <Redirect to="/login" />}
      </Switch>
    </CommunitiesContext.Provider>
  );
}
