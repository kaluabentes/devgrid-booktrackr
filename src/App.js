import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "styles/variables.css";

import routes from "config/routes";

export default function App() {
  return (
    <Router>
      <Switch>
        {routes.map((route) => (
          <Route exact key={route.path} path={route.path}>
            {route.component}
          </Route>
        ))}
      </Switch>
    </Router>
  );
}
