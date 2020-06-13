import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexGrow: 1,
    },
  })
)

const Content = () => {
  const classes = useStyles()
  return <main className={classes.root}>content</main>
}

export default Content
