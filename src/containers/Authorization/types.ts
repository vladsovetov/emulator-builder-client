import { LOGIN, LOGIN_START } from './constants';

export interface StateInterface {
  user: User | null;
  isAuthInProgress: boolean;
}

export type LoginAction = {
  type: typeof LOGIN;
  payload: {
    email: string;
    password: string;
  };
};

export type LoginStartAction = {
  type: typeof LOGIN_START;
};

export type AuthorizationActionTypes = LoginAction | LoginStartAction;
