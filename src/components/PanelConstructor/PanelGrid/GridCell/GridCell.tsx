import React, { useContext } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import PanelBuilderContext from '../../../../containers/PanelBuilder/panel-builder-context';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      outline: `2px solid ${theme.palette.primary.main}`,
      '&:hover': {
        outlineColor: 'orange',
        color: 'orange',
      },
    },
    empty: {
      '&::before': {
        display: 'block',
        content: '"+"',
      },
    },
    active: {
      backgroundColor: 'green',
    },
  })
);

interface GridCellProps extends CellInterface {
  active: boolean;
}

const GridCell = (props: GridCellProps) => {
  const classes = useStyles();
  const { addCell, removeCell } = useContext(PanelBuilderContext);

  const handleOnClick = () => {
    const { active, ...cell } = props;
    if (!active) {
      addCell(cell);
    } else {
      removeCell(cell);
    }
  };
  return (
    <div
      className={`${classes.root} ${
        props.active ? classes.active : classes.empty
      }`}
      style={{
        width: `${props.width}px`,
        height: `${props.height}px`,
        transform: `translate(${props.left}px, ${props.top}px)`,
      }}
      onClick={handleOnClick}
    ></div>
  );
};

export default GridCell;
