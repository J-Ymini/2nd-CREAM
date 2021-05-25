import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from './pages/Main';

class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          {/* <Route exact path="/login" component={Login} /> */}
          {/* <Route exact path="/detail" component={Detail} /> */}
        </Switch>
      </Router>
    );
  }
}

export default Routes;
