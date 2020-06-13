import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

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
    verticalSplitter: {
      width: '1px',
      height: '1.5em',
      margin: '0 16px',
      background: 'white',
    },
  })
)

const TopBar = () => {
  const { t } = useTranslation()
  const classes = useStyles()
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
        <Button color="inherit">{t('ui.constructor.menu.panels')}</Button>
        <div className={classes.verticalSplitter}></div>
        <Button color="inherit">{t('ui.constructor.menu.logout')}</Button>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
