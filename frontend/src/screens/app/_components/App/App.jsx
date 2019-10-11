import { Box, Grid, Grommet } from 'grommet';
import { grommet } from 'grommet/themes';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Header } from '../';
import ROUTES from '../../../../shared/routes';
import BoardContainer from '../../board';
import NoAccess from '../../noaccess';
import ProjectContainer from '../../projects';

const App = () => {
  return (
    <Grommet full theme={grommet}>
      <Grid
        fill
        rows={['auto', 'flex']}
        columns={['auto', 'flex']}
        areas={[
          { name: 'header', start: [0, 0], end: [1, 0] },
          { name: 'main', start: [0, 1], end: [1, 1] },
        ]}
      >
        <Header />
        <Box gridArea="main">
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
            <Redirect to={ROUTES.PROJECTS} />
          </Switch>
        </Box>
      </Grid>
    </Grommet>
  );
};

export default App;
