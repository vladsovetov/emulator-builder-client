import React from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import PanelGrid from './PanelGrid/PanelGrid';

type PanelConstructorProps = {
  panel: {
    [key: string]: string | number;
  };
  cellsGrid: {
    [key: string]: string | number;
  };
  cells: CellInterface[];
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      backgroundColor: 'orange',
      boxSizing: 'border-box',
    },
    panelBody: {
      display: 'flex',
      flexGrow: 1,
      backgroundColor: 'white',
      position: 'relative',
    },
  })
);

const PanelConstructor = (props: PanelConstructorProps) => {
  const classes = useStyles();
  const { name, ...style } = props.panel;
  const panelBodyWidth =
    +props.panel.width - (props.panel.padding ? +props.panel.padding * 2 : 0);
  const panelBodyHeight =
    +props.panel.height - (props.panel.padding ? +props.panel.padding * 2 : 0);
  return (
    <Paper className={classes.root} style={style}>
      <div className={classes.panelBody}>
        <PanelGrid
          cellsGrid={props.cellsGrid}
          cells={props.cells}
          height={panelBodyHeight}
          width={panelBodyWidth}
        />
      </div>
    </Paper>
  );
};

export default PanelConstructor;
