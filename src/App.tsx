import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { RootState } from './store';

import ProtectedRoute from './hoc/ProtectedRoute/ProtectedRoute';
import TopBar from './components/TopBar/TopBar';
import Content from './components/Content/Content';
import PanelBuilder from './containers/PanelBuilder/PanelBuilder';
import Authorization from './containers/Authorization/Authorization';

// import './App.css'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
    },
  })
);

function App() {
  const classes = useStyles();
  const user = useSelector(
    (state: RootState) => state.authorizationReducer.user
  );
  console.log(user);
  const isAuthorized = user !== null;
  return (
    <Suspense fallback="Loading...">
      <div className={classes.root}>
        <Router>
          <TopBar isAuthorized={isAuthorized} />
          <Content>
            <Switch>
              <ProtectedRoute path="/panels" isAuthorized={isAuthorized}>
                <PanelBuilder />
              </ProtectedRoute>
              <Route path="/login">
                <Authorization />
              </Route>
            </Switch>
          </Content>
        </Router>
      </div>
    </Suspense>
  );
}

export default App;
