import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import FormControls from '../../components/FormControls/FormControls';
import PanelConstructor from '../../components/PanelConstructor/PanelConstructor';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    controls: {
      marginBottom: '16px',
    },
  })
);

const PanelBuilder = () => {
  const classes = useStyles();
  const [panel, setPanel] = useState({
    name: 'test panel',
    width: 400,
    height: 600,
    borderRadius: 10,
    padding: 16,
  });

  const [cellsGrid, setCellsGrid] = useState({
    width: 32,
    height: 32,
  });

  const handleControlsUpdate = (event: React.ChangeEvent) => {
    const fieldName = event.target.getAttribute('data-name');
    const fieldType = event.target.getAttribute('type');
    let fieldValue: number | string = (event.target as HTMLInputElement).value;
    if (fieldType === 'number') {
      fieldValue = parseFloat(fieldValue);
    }

    if (fieldName !== null) {
      setPanel((prevPanel) => ({
        ...prevPanel,
        [fieldName]: fieldValue,
      }));
    }
  };

  const handleCellsGridControlsUpdate = (event: React.ChangeEvent) => {
    const fieldName = event.target.getAttribute('data-name');
    const fieldType = event.target.getAttribute('type');
    let fieldValue: number | string = (event.target as HTMLInputElement).value;
    if (fieldType === 'number') {
      fieldValue = parseFloat(fieldValue);
    }

    if (fieldName !== null) {
      setCellsGrid((prevPanel) => ({
        ...prevPanel,
        [fieldName]: fieldValue,
      }));
    }
  };

  return (
    <>
      <div className={classes.controls}>
        <FormControls data={panel} onUpdate={handleControlsUpdate} />
      </div>
      <div className={classes.controls}>
        <FormControls
          data={cellsGrid}
          onUpdate={handleCellsGridControlsUpdate}
        />
      </div>
      <PanelConstructor panel={panel} cellsGrid={cellsGrid} />
    </>
  );
};

export default PanelBuilder;
