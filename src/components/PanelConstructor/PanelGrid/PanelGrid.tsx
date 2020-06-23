import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      height: '100%',
      width: '100%',
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
  height: number;
  width: number;
};

const PanelGrid = (props: PanelGridProps) => {
  const classes = useStyles();
  const lineThickness = 1;
  const cellWidth = +props.cellsGrid.width;
  const cellHeight = +props.cellsGrid.height;

  const renderLines = (
    cellSize: number,
    lineDirection: 'vertical' | 'horizontal' = 'vertical'
  ) => {
    const containerSide =
      lineDirection === 'vertical' ? props.width : props.height;
    let cells =
      cellSize > 0 ? Math.floor(containerSide / (cellSize + lineThickness)) : 0;
    const lines = [];
    const shift =
      (containerSide - (cellSize * cells + (lineThickness * cells + 1))) / 2;
    for (let ind = 0; ind <= cells; ind++) {
      const style =
        lineDirection === 'vertical'
          ? {
              left: shift + ind * (cellSize + lineThickness),
              height: '100%',
              width: `${lineThickness}px`,
            }
          : {
              top: shift + ind * (cellSize + lineThickness),
              width: '100%',
              height: `${lineThickness}px`,
            };
      lines.push(<div className={classes.line} key={ind} style={style}></div>);
    }
    return lines;
  };

  return (
    <div className={classes.root}>
      {renderLines(cellWidth)}
      {renderLines(cellHeight, 'horizontal')}
    </div>
  );
};

export default PanelGrid;
