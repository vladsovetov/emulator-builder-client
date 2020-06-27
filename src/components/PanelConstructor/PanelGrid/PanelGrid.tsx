import React, { useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import GridCell from './GridCell/GridCell';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      width: '100%',
      height: '100%',
    },
    line: {
      position: 'absolute',
      backgroundColor: 'red',
    },
    lineVertical: {},
    lineHorizontal: {
      backgroundColor: 'yellow',
    },
  })
);

type PanelGridProps = {
  cellsGrid: {
    [key: string]: string | number;
  };
  width: number;
  height: number;
};

const PanelGrid = (props: PanelGridProps) => {
  const classes = useStyles();
  const cellWidth = +props.cellsGrid.width;
  const cellHeight = +props.cellsGrid.height;
  const horizontalSpace = +props.cellsGrid.horizontalSpace;
  const verticalSpace = +props.cellsGrid.verticalSpace;

  const renderCells = () => {
    const columns =
      cellWidth > 0
        ? Math.floor(props.width / (cellWidth + horizontalSpace))
        : 0;
    const rows =
      cellHeight > 0
        ? Math.floor(props.height / (cellHeight + verticalSpace))
        : 0;

    const outlineSpace = {
      horizontal: Math.round(
        (props.width -
          columns * (cellWidth + horizontalSpace) +
          horizontalSpace) /
          2
      ),
      vertical: Math.round(
        (props.height - rows * (cellHeight + verticalSpace) + verticalSpace) / 2
      ),
    };
    const cells: JSX.Element[] = [];
    for (let rowInd = 0; rowInd < rows; rowInd++) {
      for (let colInd = 0; colInd < columns; colInd++) {
        cells.push(
          <GridCell
            key={rowInd * columns + colInd}
            width={cellWidth}
            height={cellHeight}
            left={
              colInd * (cellWidth + horizontalSpace) + outlineSpace.horizontal
            }
            top={rowInd * (cellHeight + verticalSpace) + outlineSpace.vertical}
          />
        );
      }
    }
    return cells;
  };

  return <div className={classes.root}>{renderCells()}</div>;
};

export default PanelGrid;
