import { PanelType, CellGridType } from './types';
import { UPDATE_PANEL, UPDATE_CELLS_GRID } from './constants';

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
