import {
  UPDATE_PANEL,
  UPDATE_ELEMENT,
  CREATE_ELEMENT,
  REMOVE_ELEMENT,
  SELECT_ELEMENT,
} from './constants';

export function updatePanel(elementFields: Partial<Panel>) {
  return {
    type: UPDATE_PANEL,
    payload: elementFields,
  };
}

export function updateElement(
  id: number,
  elementFields: Partial<PanelElement>
) {
  return {
    type: UPDATE_ELEMENT,
    payload: {
      id,
      elementFields,
    },
  };
}

export function createElement(element: PanelElement) {
  return {
    type: CREATE_ELEMENT,
    payload: element,
  };
}

export function removeElement(element: PanelElement) {
  return {
    type: REMOVE_ELEMENT,
    payload: element,
  };
}

export function selectElement(id: number) {
  return {
    type: SELECT_ELEMENT,
    payload: id,
  };
}
