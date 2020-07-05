import { StateInterface, AuthorizationActionTypes } from './types';
import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT } from './constants';

const initialState: StateInterface = {
  user: null,
  isAuthInProgress: false,
  error: undefined,
};

export default (state = initialState, action: AuthorizationActionTypes) => {
  console.log(action);
  switch (action.type) {
    case LOGIN_START: {
      return {
        ...state,
        isAuthInProgress: true,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthInProgress: false,
        user: action.payload,
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        isAuthInProgress: false,
        error: action.payload,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        user: null,
      };
    }
    default:
      return state;
  }
};
