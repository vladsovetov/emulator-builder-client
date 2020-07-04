import { StateInterface, AuthorizationActionTypes } from './types';
import { LOGIN, LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED } from './constants';

const initialState: StateInterface = {
  user: null,
  isAuthInProgress: false,
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
    default:
      return state;
  }
};
