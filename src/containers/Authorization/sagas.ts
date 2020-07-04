import { put, call, takeEvery } from 'redux-saga/effects';

import axios from '../../utils/axios';
import { LOGIN } from './constants';
import { loginStart } from './actions';

export function* login(action: any) {
  console.log(action);
  yield put(loginStart());
  const response = yield call(() =>
    axios.post('/auth/login', {
      email: action.payload.email,
      password: action.payload.password,
    })
  );
  console.log(response);
}

export default function* watchAuthorization() {
  yield takeEvery(LOGIN, login);
}
