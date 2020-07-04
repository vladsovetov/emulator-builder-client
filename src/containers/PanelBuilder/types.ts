import {
  UPDATE_PANEL,
  UPDATE_ELEMENT,
  CREATE_ELEMENT,
  REMOVE_ELEMENT,
  SELECT_ELEMENT,
} from './constants';

export interface StateInterface {
  panel: Panel;
  elements: PanelElement[];
  selectedElementId: number;
}

export type UpdatePanelAction = {
  type: typeof UPDATE_PANEL;
  payload: Partial<Panel>;
};

export type UpdateElementAction = {
  type: typeof UPDATE_ELEMENT;
  payload: {
    id: number;
    elementFields: Partial<PanelElement>;
  };
};

export type CreateElementAction = {
  type: typeof CREATE_ELEMENT;
  payload: PanelElement;
};

export type RemoveElementAction = {
  type: typeof REMOVE_ELEMENT;
  payload: PanelElement;
};

export type SelectElementAction = {
  type: typeof SELECT_ELEMENT;
  payload: number;
};

export type PanelBuilderActionTypes =
  | UpdatePanelAction
  | UpdateElementAction
  | CreateElementAction
  | RemoveElementAction
  | SelectElementAction;
