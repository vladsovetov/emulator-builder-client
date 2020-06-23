import React, { Suspense } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import TopBar from './components/TopBar/TopBar';
import Content from './components/Content/Content';

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
  return (
    <Suspense fallback="Loading...">
      <div className={classes.root}>
        <TopBar />
        <Content />
      </div>
    </Suspense>
  );
}

export default App;
