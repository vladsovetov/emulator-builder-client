import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import PanelBuilder from '../../containers/PanelBuilder/PanelBuilder';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'column',
      padding: '16px',
      backgroundColor: theme.palette.background.default,
    },
  })
);

const Content = () => {
  const classes = useStyles();
  return (
    <main className={classes.root}>
      <PanelBuilder />
    </main>
  );
};

export default Content;
