import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signin from './user/Signin';
import Signup from './user/Signup';
import Home from './layout/Home';
import PrivateRoute from './auth/PrivateRoute';
import Dashboard from './user/UserDashboard';
import AdminRoute from './auth/AdminRoute';
import AdminDashboard from './user/AdminDashboard';
import AddEvent from './admin/AddEvent';
import UpdateEvent from './admin/UpdateEvent';
import AddTrip from './admin/AddTrip';

const Routes = () => {
  return (
    <BrowserRouter>
      <Home />
      <Switch>
        <Route exact path='/Signup' component={Signup} />
        <Route exact path='/Signin' component={Signin} />
        <PrivateRoute path='/user/dashboard' exact component={Dashboard} />
        <AdminRoute path='/admin/dashboard' exact component={AdminDashboard} />
        <AdminRoute
          path='/admin/event/update/:eventId'
          exact
          component={UpdateEvent}
        />

        <AdminRoute path='/create/event' exact component={AddEvent} />
        <AdminRoute path='/create/trip' exact component={AddTrip} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
