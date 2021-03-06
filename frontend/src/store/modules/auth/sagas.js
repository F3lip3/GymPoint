import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { signInSuccess, signInFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;
    const response = yield call(api.post, 'sessions', {
      email,
      password
    });
    if (response.status === 200) {
      const { token, user } = response.data;
      api.defaults.headers.Authorization = `Bearer ${token}`;
      yield put(signInSuccess(token, user));
      history.push('/students');
    } else {
      toast.error(
        response.data && response.data.error
          ? response.data.error
          : 'Falha na autenticação!'
      );
    }
  } catch (err) {
    console.tron.error(err);
    toast.error('Usuário ou senha inválidos!');
    yield put(signInFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;
  const { token } = payload.auth;
  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT', signOut)
]);
