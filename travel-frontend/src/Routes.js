import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signin from './user/Signin';
import Signup from './user/Signup';
import Home from './core/Home';
import PrivateRoute from './auth/PrivateRoute';
import Dashboard from './user/UserDashboard';
import AdminRoute from './auth/AdminRoute';
import AdminDashboard from './user/AdminDashboard';
import AddEvent from './admin/AddEvent';
import AddEvents from './administrator/AddEvents';
import UpdateEvent from './admin/UpdateEvent';
import AddTrip from './admin/AddTrip';
import Navbar from './core/Navbar';

const Routes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      {/* <Home /> */}
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
        {/* <AdminRoute path='/create/events' exact component={AddEvents} /> */}
        <AdminRoute path='/create/events' exact component={AddEvent} />
        <AdminRoute path='/create/trip' exact component={AddTrip} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
