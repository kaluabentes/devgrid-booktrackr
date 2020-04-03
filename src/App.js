import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import routes from "config/routes";

export default function App() {
  return (
    <Router>
      <Switch>
        {routes.map((route) => (
          <Route exact path={route.path}>
            {route.component}
          </Route>
        ))}
      </Switch>
    </Router>
  );
}
