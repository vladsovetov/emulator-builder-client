import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      cursor: 'pointer',
      outline: `2px solid ${theme.palette.primary.main}`,
      '&:hover': {
        backgroundColor: theme.palette.background.default,
        outlineColor: 'orange',
      },
    },
  })
);

type GridCellProps = {
  height: number;
  width: number;
  top: number;
  left: number;
};

const GridCell = (props: GridCellProps) => {
  const classes = useStyles();
  return (
    <div
      className={classes.root}
      style={{
        width: `${props.width}px`,
        height: `${props.height}px`,
        transform: `translate(${props.left}px, ${props.top}px)`,
      }}
    ></div>
  );
};

export default GridCell;
