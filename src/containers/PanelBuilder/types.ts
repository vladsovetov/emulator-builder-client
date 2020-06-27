import { UPDATE_PANEL, UPDATE_CELLS_GRID } from './constants';

export type PanelType = {
  name: string;
  width: number;
  height: number;
  borderRadius: number;
  padding: number;
};

export type CellGridType = {
  width: number;
  height: number;
  verticalSpace: number;
  horizontalSpace: number;
};

export type UpdatePanelAction = {
  type: typeof UPDATE_PANEL;
  payload: PanelType;
};

export type UpdateCellsGridAction = {
  type: typeof UPDATE_CELLS_GRID;
  payload: CellGridType;
};

export type PanelBuilderActionTypes = UpdatePanelAction | UpdateCellsGridAction;
