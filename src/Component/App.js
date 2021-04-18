import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ZipCode from "./ZipCode";
import City from "./City";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/zipcode" />
          </Route>

          <Route exact path="/zipcode">
            <ZipCode />
          </Route>

          <Route exact path="/">
            <Redirect to="/cityname" />
          </Route>

          <Route exact path="/city">
            <City />
          </Route>
        </Switch>
      </Router>
    );
  }
}
