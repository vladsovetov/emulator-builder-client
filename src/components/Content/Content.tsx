import React, { ReactElement } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

type ContentProps = {
  children: ReactElement;
};

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

const Content = ({ children }: ContentProps) => {
  const classes = useStyles();
  return <main className={classes.root}>{children}</main>;
};

export default Content;
