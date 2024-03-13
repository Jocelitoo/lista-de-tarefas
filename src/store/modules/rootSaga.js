import { all } from 'redux-saga/effects';

import { loginSaga } from './login/loginSaga';

export function* rootSaga() {
  return yield all([loginSaga]); // return yield all([saga1, saga2, saga3, ...])
}
