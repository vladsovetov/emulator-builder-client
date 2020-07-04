import { LOGIN, LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED } from './constants';

export function login(email: string, password: string) {
  return {
    type: LOGIN,
    payload: {
      email,
      password,
    },
  };
}

export function loginStart() {
  return {
    type: LOGIN_START,
  };
}

export function loginSuccess(user: User) {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
}

export function loginFailed(error: Error) {
  return {
    type: LOGIN_FAILED,
    payload: error,
  };
}

export function test() {
  return {
    type: 'TEST',
  };
}
