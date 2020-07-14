import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Signin from './user/Signin';
import Signup from './user/Signup';
import Home from './layout/Home';

const Routes = () => {
  return (
    <BrowserRouter>
      <Home />
      <Switch>
        {/* <Route exact path='/' component={Home} /> */}
        <Route exact path='/Signup' component={Signup} />
        <Route exact path='/Signin' component={Signin} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
