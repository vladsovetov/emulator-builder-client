import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { throttle } from 'throttle-debounce';
import useConstant from 'use-constant';

import { RootState } from '../../store';
import {
  updatePanel,
  updateCellsGrid,
} from '../../containers/PanelBuilder/actions';

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
  const panel = useSelector(
    (state: RootState) => state.panelBuilderReducer.panel
  );
  const cellsGrid = useSelector(
    (state: RootState) => state.panelBuilderReducer.cellsGrid
  );
  const dispatch = useDispatch();

  const handlePanelControlsUpdate = (event: React.ChangeEvent) => {
    event.persist();
    throttledPanelControlsUpdate(event);
  };

  const throttledPanelControlsUpdate = useConstant(() =>
    throttle(200, (event: React.ChangeEvent) => {
      console.log('throttledPanelControlsUpdate');
      const fieldName = event.target.getAttribute('data-name');
      const fieldType = event.target.getAttribute('type');
      let fieldValue: number | string = (event.target as HTMLInputElement)
        .value;
      if (fieldType === 'number') {
        fieldValue = parseFloat(fieldValue);
      }

      if (fieldName !== null) {
        dispatch(
          updatePanel({
            [fieldName]: fieldValue,
          })
        );
      }
    })
  );

  const handleCellsGridControlsUpdate = (event: React.ChangeEvent) => {
    event.persist();
    throttledCellsGridControlsUpdate(event);
  };

  const throttledCellsGridControlsUpdate = useConstant(() =>
    throttle(200, (event: React.ChangeEvent) => {
      const fieldName = event.target.getAttribute('data-name');
      const fieldType = event.target.getAttribute('type');
      let fieldValue: number | string = (event.target as HTMLInputElement)
        .value;
      if (fieldType === 'number') {
        fieldValue = parseFloat(fieldValue);
      }
      if (fieldName !== null) {
        dispatch(
          updateCellsGrid({
            [fieldName]: fieldValue,
          })
        );
      }
    })
  );

  return (
    <>
      <div className={classes.controls}>
        <FormControls data={panel} onUpdate={handlePanelControlsUpdate} />
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
