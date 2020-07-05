import { put, call, takeEvery, delay } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import axios from '../../utils/axios';
import { LOGIN } from './constants';
import { loginStart, loginSuccess, loginFailed, logout } from './actions';
import {
  getUserFromJwt,
  getTokenExpirationDelay,
  storeToken,
} from './services';

export function* login(action: any) {
  console.log(action);
  yield put(loginStart());
  try {
    const response: AxiosResponse = yield call(() =>
      axios.post('/auth/login', {
        email: action.payload.email,
        password: action.payload.password,
      })
    );
    const token = response.data.data;
    // store token to communicate with server
    yield call(storeToken, token);
    // get user data from the token and store in app store
    const user = yield call(getUserFromJwt, token);
    yield put(loginSuccess(user));
    const expirationDelay = yield call(getTokenExpirationDelay, token);
    yield delay(expirationDelay);
    yield put(logout());
  } catch (error) {
    yield put(loginFailed(error));
  }
}

export default function* watchAuthorization() {
  yield takeEvery(LOGIN, login);
}
