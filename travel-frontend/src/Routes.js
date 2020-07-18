import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signin from './user/Signin';
import Signup from './user/Signup';
import Home from './layout/Home';
import PrivateRoute from './auth/PrivateRoute';
import Dashboard from './user/UserDashboard';
import AdminRoute from './auth/AdminRoute';
import AdminDashboard from './user/AdminDashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <Home />
      <Switch>
        <Route exact path='/Signup' component={Signup} />
        <Route exact path='/Signin' component={Signin} />
        <PrivateRoute path='/user/dashboard' exact component={Dashboard} />
        <AdminRoute path='/admin/dashboard' exact component={AdminDashboard} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
