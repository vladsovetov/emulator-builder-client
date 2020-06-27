import { PanelType, CellGridType, PanelBuilderActionTypes } from './types';
import { UPDATE_PANEL, UPDATE_CELLS_GRID } from './constants';

interface StateInterface {
  panel: PanelType;
  cellsGrid: CellGridType;
}

const initialState: StateInterface = {
  panel: {
    name: 'test panel',
    width: 400,
    height: 600,
    borderRadius: 10,
    padding: 16,
  },
  cellsGrid: {
    width: 32,
    height: 32,
    verticalSpace: 8,
    horizontalSpace: 8,
  },
};

export default (state = initialState, action: PanelBuilderActionTypes) => {
  switch (action.type) {
    case UPDATE_PANEL:
      return {
        ...state,
        panel: {
          ...state.panel,
          ...action.payload,
        },
      };
    case UPDATE_CELLS_GRID:
      return {
        ...state,
        cellsGrid: {
          ...state.cellsGrid,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};
