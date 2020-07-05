import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT } from './constants';

export interface StateInterface {
  user: User | null;
  isAuthInProgress: boolean;
  error?: string;
}

export type LoginStartAction = {
  type: typeof LOGIN_START;
};

export type LoginSuccessAction = {
  type: typeof LOGIN_SUCCESS;
  payload: User;
};

export type LoginFailedAction = {
  type: typeof LOGIN_FAILED;
  payload: string;
};

export type LogoutAction = {
  type: typeof LOGOUT;
};

export type AuthorizationActionTypes =
  | LoginStartAction
  | LoginSuccessAction
  | LoginFailedAction
  | LogoutAction;
