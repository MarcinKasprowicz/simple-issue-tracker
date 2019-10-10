import { Route, Switch, Redirect } from 'react-router-dom';
import ROUTES from '../../../../shared/routes';

import React from 'react';
import ProjectContainer from '../../projects';
import BoardContainer from '../../board';
import NoAccess from '../../noaccess';
import {logout, getUser} from '../../../../services/auth.service';

const App = () => {
  const user = getUser();
  return (
    <div id="app">
      TO JE APP {user.firstName} - {user.lastName}
      <div onClick={() => logout()}>LOGOUT</div>
      <Switch>
        <Route path={ROUTES.PROJECTS}>
          <ProjectContainer />
        </Route>
        <Route path={ROUTES.BOARD}>
          <BoardContainer />
        </Route>
        <Route path={ROUTES.NO_ACCESS}>
          <NoAccess />
        </Route>
        <Redirect to={ROUTES.PROJECTS}></Redirect>
      </Switch>
    </div>
  );
};

export default App;
