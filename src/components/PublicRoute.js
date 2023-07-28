import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth";
import { Redirect, Route, useHistory } from "react-router-dom";

const PublicRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);

  const history = useHistory();

  useEffect(() => {
    if (user) {
      history.push("/");
    } else {
      history.push("/login");
    }
  }, [history, user]);

  return (
    <Route
      {...rest}
      exact
      render={(props) =>
        !user ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PublicRoute;
