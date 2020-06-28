import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { throttle } from 'throttle-debounce';
import useConstant from 'use-constant';
import { useTranslation } from 'react-i18next';

import PanelBuilderContext from './panel-builder-context';
import { RootState } from '../../store';
import {
  updatePanel,
  updateCellsGrid,
  addCell,
  removeCell,
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
  const cells = useSelector(
    (state: RootState) => state.panelBuilderReducer.cells
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handlePanelControlsUpdate = (event: React.ChangeEvent) => {
    event.persist();
    throttledPanelControlsUpdate(event);
  };

  const throttledPanelControlsUpdate = useConstant(() =>
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

  const handleAddCell = (cell: CellInterface) => {
    dispatch(addCell(cell));
  };

  const handleRemoveCell = (cell: CellInterface) => {
    dispatch(removeCell(cell));
  };

  return (
    <PanelBuilderContext.Provider
      value={{
        addCell: handleAddCell,
        removeCell: handleRemoveCell,
      }}
    >
      <div className={classes.controls}>
        <FormControls
          label={t('ui.constructor.panelSettings')}
          data={panel}
          onUpdate={handlePanelControlsUpdate}
        />
      </div>
      <div className={classes.controls}>
        <FormControls
          label={t('ui.constructor.cellsGridSettings')}
          data={cellsGrid}
          onUpdate={handleCellsGridControlsUpdate}
        />
      </div>
      <PanelConstructor panel={panel} cellsGrid={cellsGrid} cells={cells} />
    </PanelBuilderContext.Provider>
  );
};

export default PanelBuilder;
