import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import Students from '../pages/Students';
import StudentForm from '../pages/Students/Form';
import Plans from '../pages/Plans';
import PlansForm from '../pages/Plans/Form';
import Registrations from '../pages/Registrations';
import HelpOrders from '../pages/HelpOrders';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/students" exact component={Students} isPrivate />
      <Route path="/students/add" component={StudentForm} isPrivate />
      <Route path="/student/:id" component={StudentForm} isPrivate />
      <Route path="/plans" exact component={Plans} isPrivate />
      <Route path="/plans/add" component={PlansForm} isPrivate />
      <Route path="/plan/:id" component={PlansForm} isPrivate />
      <Route path="/registrations" component={Registrations} isPrivate />
      <Route path="/helporders" component={HelpOrders} isPrivate />
    </Switch>
  );
}
