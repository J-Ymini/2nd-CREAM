import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Main from './pages/Main/Main';
import Mypage from './pages/Mypage/Mypage';
import Detail from './pages/Detail/Detail';

class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/products/detail/:id" component={Detail} />
          <Route exact path="/my" component={Mypage} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
