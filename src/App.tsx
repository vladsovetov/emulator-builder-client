import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { RootState } from './store';
import { logout } from './containers/Authorization/actions';
import {
  getTokenExpirationDelay,
  cleanToken,
} from './containers/Authorization/services';
import { TOKEN_KEY } from './containers/Authorization/constants';

import SmartRoute from './hoc/SmartRoute/SmartRoute';
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
  const user = useSelector((state: RootState) => state.authorization.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      const expirationDelay = getTokenExpirationDelay(token);
      setTimeout(() => {
        cleanToken();
        dispatch(logout());
      }, expirationDelay);
    }
  }, [dispatch]);
  const isAuthorized = user !== null;
  return (
    <Suspense fallback="Loading...">
      <div className={classes.root}>
        <Router>
          <TopBar isAuthorized={isAuthorized} />
          <Content>
            <Switch>
              <SmartRoute path="/panels" roles={['ADMIN']}>
                <PanelBuilder />
              </SmartRoute>
              <SmartRoute path="/login" roles={['GUEST']}>
                <Authorization />
              </SmartRoute>
            </Switch>
          </Content>
        </Router>
      </div>
    </Suspense>
  );
}

export default App;
