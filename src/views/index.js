import React from 'react';
import {
  HashRouter as Router,
  Route
} from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';

import Users from './users';
import Todos from './todos';

export default function() {
  return (
    <Router history={createHashHistory()}>
      <div>
        <Route exact path="/" component={Users} />
        <Route path="/users/:user" component={Users} />
        <Route path="/todos" component={Todos} />
      </div>
    </Router>
  )
};
