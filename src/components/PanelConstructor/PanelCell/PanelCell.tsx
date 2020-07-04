import React, { useContext } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import PanelBuilderContext from '../../../containers/PanelBuilder/panel-builder-context';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      cursor: 'pointer',
      border: '3px solid yellow',
      backgroundColor: 'white',
    },
  })
);

interface PanelCellProps extends PanelCell {
  className?: string;
}

const PanelCell = ({ id, top, left, className, ...style }: PanelCellProps) => {
  const classes = useStyles();
  const { selectElement } = useContext(PanelBuilderContext);

  const handleOnClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    selectElement(id);
  };

  return (
    <div
      className={`${classes.root} ${className ? className : ''}`}
      style={{
        ...style,
        transform: `translate(${left}px, ${top}px)`,
      }}
      onClick={handleOnClick}
    ></div>
  );
};

export default PanelCell;
