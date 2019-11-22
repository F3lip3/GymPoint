import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import Students from '../pages/Students';
import StudentForm from '../pages/Students/Form';
import Plans from '../pages/Plans';
import PlanForm from '../pages/Plans/Form';
import Registrations from '../pages/Registrations';
import RegistrationForm from '../pages/Registrations/Form';
import HelpOrders from '../pages/HelpOrders';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/students" exact component={Students} isPrivate />
      <Route path="/students/add" component={StudentForm} isPrivate />
      <Route path="/student/:id" component={StudentForm} isPrivate />
      <Route path="/plans" exact component={Plans} isPrivate />
      <Route path="/plans/add" component={PlanForm} isPrivate />
      <Route path="/plan/:id" component={PlanForm} isPrivate />
      <Route path="/registrations" exact component={Registrations} isPrivate />
      <Route path="/registrations/add" component={RegistrationForm} isPrivate />
      <Route path="/registration/:id" component={RegistrationForm} isPrivate />
      <Route path="/helporders" component={HelpOrders} isPrivate />
    </Switch>
  );
}
