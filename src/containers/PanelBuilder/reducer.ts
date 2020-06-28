import { PanelType, CellGridType, PanelBuilderActionTypes } from './types';
import {
  UPDATE_PANEL,
  UPDATE_CELLS_GRID,
  ADD_CELL,
  REMOVE_CELL,
} from './constants';

interface StateInterface {
  panel: PanelType;
  cellsGrid: CellGridType;
  cells: CellInterface[];
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
  cells: [],
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
    case ADD_CELL: {
      const updatedCells = state.cells.concat(action.payload);
      return {
        ...state,
        cells: updatedCells,
      };
    }

    case REMOVE_CELL: {
      const updatedCells = state.cells.filter(
        (cell) => cell.index !== action.payload.index
      );
      return {
        ...state,
        cells: updatedCells,
      };
    }
    default:
      return state;
  }
};
