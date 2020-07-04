import React, { useContext } from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import PanelBuilderContext from '../../containers/PanelBuilder/panel-builder-context';
import PanelCell from './PanelCell/PanelCell';

type PanelConstructorProps = {
  panel: Panel;
  elements: PanelElement[];
  selectedElementId: number;
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
      backgroundImage: `
        linear-gradient(45deg, #353535 1px, transparent 1px),
        linear-gradient(135deg, #353535 1px, transparent 1px),
        linear-gradient(225deg, #353535 1px, transparent 1px),
        linear-gradient(315deg, #353535 1px, transparent 1px)
      `,
      backgroundSize: '16px 16px',
      position: 'relative',
    },
    selected: {
      outline: '2px solid blue',
    },
  })
);

const PanelConstructor = (props: PanelConstructorProps) => {
  const classes = useStyles();
  const { name, ...style } = props.panel;
  const { selectElement } = useContext(PanelBuilderContext);

  const panelClasses = [classes.root];
  if (props.selectedElementId === 0) {
    panelClasses.push(classes.selected);
  }
  return (
    <Paper
      className={panelClasses.join(' ')}
      style={style}
      onClick={() => selectElement(0)}
    >
      <div className={classes.panelBody}>
        {props.elements.map((element) => {
          const selected = element.id === props.selectedElementId;
          if (element.type === 'cell') {
            return (
              <PanelCell
                key={element.id}
                {...element}
                className={selected ? classes.selected : ''}
              />
            );
          }
          return null;
        })}
      </div>
    </Paper>
  );
};

export default PanelConstructor;
