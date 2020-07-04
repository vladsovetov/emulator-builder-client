import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { throttle } from 'throttle-debounce';
import { useTranslation } from 'react-i18next';

import PanelBuilderContext from './panel-builder-context';
import { RootState } from '../../store';
import {
  updateElement,
  createElement,
  selectElement,
  updatePanel,
} from '../../containers/PanelBuilder/actions';

import FormControls from '../../components/FormControls/FormControls';
import PanelConstructor from '../../components/PanelConstructor/PanelConstructor';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    controls: {
      marginBottom: 16,
    },
    button: {
      marginRight: 16,
    },
  })
);

const PanelBuilder = () => {
  const classes = useStyles();
  const panel = useSelector(
    (state: RootState) => state.panelBuilderReducer.panel
  );
  const elements = useSelector(
    (state: RootState) => state.panelBuilderReducer.elements
  );
  const selectedElementId = useSelector(
    (state: RootState) => state.panelBuilderReducer.selectedElementId
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleControlsUpdate = (event: React.ChangeEvent) => {
    event.persist();
    throttledControlsUpdate(event);
  };

  const throttledControlsUpdate = throttle(100, (event: React.ChangeEvent) => {
    const fieldName = event.target.getAttribute('data-name');
    const fieldType = event.target.getAttribute('type');
    let fieldValue: number | string = (event.target as HTMLInputElement).value;
    if (fieldType === 'number') {
      fieldValue = parseFloat(fieldValue) || 0;
    }

    if (fieldName !== null) {
      if (selectedElementId === 0) {
        dispatch(
          updatePanel({
            [fieldName]: fieldValue,
          })
        );
      } else {
        dispatch(
          updateElement(selectedElementId, {
            [fieldName]: fieldValue,
          })
        );
      }
    }
  });

  const handleAddElement = () => {
    const element: PanelCell = {
      id: elements.length + 1,
      type: 'cell',
      width: 42,
      height: 42,
      left: 10,
      top: 10,
    };
    dispatch(createElement(element));
    dispatch(selectElement(element.id));
  };

  const handleSelectElement = (id: number) => {
    dispatch(selectElement(id));
  };

  const handleSavePanel = () => {};

  const getControlsTitle = () => {
    if (selectedElementId === 0) {
      return t('ui.constructor.panelSettings');
    } else {
      const type = elements.find((element) => element.id === selectedElementId)
        ?.type;
      switch (type) {
        case 'cell':
          return t('ui.constructor.cellSettings');
        default:
          return t('ui.constructor.settings');
      }
    }
  };

  let selectedElement: Panel | PanelElement = panel;
  if (selectedElementId !== 0) {
    const element = elements.find(
      (element: PanelElement) => element.id === selectedElementId
    );
    if (element) {
      selectedElement = element;
    }
  }

  return (
    <PanelBuilderContext.Provider
      value={{
        selectElement: handleSelectElement,
      }}
    >
      <div className={classes.controls}>
        <FormControls
          label={getControlsTitle()}
          data={selectedElement}
          onUpdate={handleControlsUpdate}
        />
      </div>
      <div className={classes.controls}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleAddElement}
        >
          {t('ui.constructor.controls.addElement')}
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleSavePanel}
        >
          {t('ui.constructor.controls.savePanel')}
        </Button>
      </div>
      <PanelConstructor
        panel={panel}
        elements={elements}
        selectedElementId={selectedElementId}
      />
    </PanelBuilderContext.Provider>
  );
};

export default PanelBuilder;
