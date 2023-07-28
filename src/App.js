import React from "react";
import "./style.scss";
import { HashRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AuthProvider from "./context/auth";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import SignIn from "./pages/SignIn";
import Home2 from "./pages/Home2";
function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Navbar />
        <Switch>
          <PublicRoute exact path="/register" component={Signup} />
          <PublicRoute exact path="/login" component={SignIn} />
          <PrivateRoute exact path="/" component={Home2} />
          <PrivateRoute exact path="/profile" component={Profile} />
        </Switch>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
