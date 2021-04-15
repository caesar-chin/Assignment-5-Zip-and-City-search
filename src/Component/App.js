import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import ZipCode from './ZipCode';
import City from './City';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      zipCode: '',
    };
  }

  zipChanged = (event) => {
    let zipCode = event.target.value;
    if (zipCode.length === 5) {
      fetch(`http://ctp-zip-api.herokuapp.com/${zipCode}`)
        .then((res) => res.json())
        .then((json) => {
          this.setState({ cities: json });
        })
        .catch((err) => {
          console.log(err);
          this.setState({ cities: [] });
        });
    } else {
      this.setState({ cities: [] });
    }
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/'>
            <Redirect to='/zipcode' />
          </Route>
          <Route exact path='/zipcode'>
            <ZipCode />
          </Route>
          <Route exact path='/city'>
            <City />
          </Route>
        </Switch>
      </Router>
    );
  }
}
