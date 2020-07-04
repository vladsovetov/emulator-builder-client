import React from 'react';
import { Link } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

type TopBarProps = {
  isAuthorized: boolean;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    title: {
      flexGrow: 1,
    },
    nav: {
      display: 'flex',
      alignItems: 'center',
    },
    verticalSplitter: {
      width: '1px',
      height: '1.5em',
      margin: '0 16px',
      background: 'white',
    },
  })
);

const TopBar = ({ isAuthorized }: TopBarProps) => {
  const { t } = useTranslation();
  const classes = useStyles();

  console.log(isAuthorized);
  const renderButtons = () => {
    let buttons = null;
    if (isAuthorized) {
      buttons = (
        <>
          <Button color="inherit" component={Link} to="/cells">
            {t('ui.menu.cells')}
          </Button>
          <div className={classes.verticalSplitter}></div>
          <Button color="inherit" component={Link} to="/panels">
            {t('ui.menu.panels')}
          </Button>
          <div className={classes.verticalSplitter}></div>
          <Button color="inherit" component={Link} to="/logout">
            {t('ui.menu.logout')}
          </Button>
        </>
      );
    } else {
      buttons = (
        <Button color="inherit" component={Link} to="/login">
          {t('ui.menu.login')}
        </Button>
      );
    }
    return buttons;
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          {t('ui.constructor.title')}
        </Typography>
        <nav className={classes.nav}>{renderButtons()}</nav>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
