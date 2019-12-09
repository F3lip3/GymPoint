import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '~/services/api';

import { signInSuccess, signInFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { id } = payload;
    const response = yield call(api.get, `students/${id}`);
    if (response.status === 200) {
      const { name, email, age, weight, height } = response.data;
      yield put(
        signInSuccess({
          id,
          name,
          email,
          age,
          weight,
          height
        })
      );
    } else {
      Alert.alert('Erro no login', 'Usuário não encontrado!');
      yield put(signInFailure());
    }
  } catch (err) {
    Alert.alert('Erro no login', 'Usuário não encontrado!');
    yield put(signInFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
