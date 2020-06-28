import { PanelType, CellGridType } from './types';
import {
  UPDATE_PANEL,
  UPDATE_CELLS_GRID,
  ADD_CELL,
  REMOVE_CELL,
} from './constants';

export function updatePanel(panel: Partial<PanelType>) {
  return {
    type: UPDATE_PANEL,
    payload: panel,
  };
}

export function updateCellsGrid(cellsGrid: Partial<CellGridType>) {
  return {
    type: UPDATE_CELLS_GRID,
    payload: cellsGrid,
  };
}

export function addCell(cell: CellInterface) {
  return {
    type: ADD_CELL,
    payload: cell,
  };
}

export function removeCell(cell: CellInterface) {
  return {
    type: REMOVE_CELL,
    payload: cell,
  };
}
