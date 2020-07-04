import { PanelBuilderActionTypes, StateInterface } from './types';
import {
  UPDATE_PANEL,
  UPDATE_ELEMENT,
  CREATE_ELEMENT,
  REMOVE_ELEMENT,
  SELECT_ELEMENT,
} from './constants';

const initialState: StateInterface = {
  panel: {
    name: 'test panel',
    width: 400,
    height: 600,
    borderRadius: 10,
    padding: 16,
  },
  elements: [],
  selectedElementId: 0,
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
    case UPDATE_ELEMENT:
      const elementInd = state.elements.findIndex(
        (element) => element.id === action.payload.id
      );
      const updatedElements = [...state.elements];
      if (elementInd > -1) {
        const updatedElement = {
          ...updatedElements[elementInd],
          ...action.payload.elementFields,
        };
        updatedElements[elementInd] = updatedElement;
      }
      return {
        ...state,
        elements: updatedElements,
      };
    case CREATE_ELEMENT: {
      const updatedElements = state.elements.concat(action.payload);
      return {
        ...state,
        elements: updatedElements,
      };
    }
    case REMOVE_ELEMENT: {
      const updatedElements = state.elements.filter(
        (element) => element.id !== action.payload.id
      );
      return {
        ...state,
        elements: updatedElements,
      };
    }
    case SELECT_ELEMENT: {
      return {
        ...state,
        selectedElementId: action.payload,
      };
    }
    default:
      return state;
  }
};
