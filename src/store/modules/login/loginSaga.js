import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import axios from '../../../services/axios';

import * as actions from './loginActions'; // Importa todos os elementos exportados do arquivo loginActions.js
import * as types from '../types'; // Importa todos os elementos exportados do arquivo types.js

// Logar usuário
function* loginRequest({ payload }) {
  try {
    const response = yield call(axios.post, '/tokens', payload); // Faz um POST em https://api-lista-tarefas.vercel.app/tokens usando os dados que estão no payload
    yield put(actions.loginSucess({ ...response.data })); // Envia uma copia dos dados que response pegou para o payload da function loginSuccess()

    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`; // Quando o usuário fizer login, coloca o token do usuário dentro do header Authorization

    toast.success('Você fez login');
  } catch (e) {
    toast.error('Usuário ou senha inválidos');

    yield put(actions.loginFailure());
  }
}

function persistRehydrate({ payload }) {
  const { token } = payload.LOGIN; // Pega o 'token' do initialState de loginSlice
  if (!token) return; // Se token estiver com algum valor inválido(null,undefined,...) IF terminará a function aqui
  axios.defaults.headers.Authorization = `Bearer ${token}`; // Coloca o token no headers dentro de Authorization
}

export const loginSaga = all([
  takeLatest(types.LOGIN_REQUEST, loginRequest), // Toda vez que vc clicar no botão de login a function loginRequest() será executa e enviará o type(ação) `LOGIN/REQUEST` para o Redux. takeLatest verificará se no Redux existe algum type(ação) com o msm valor de 'types.LOGIN_REQUEST' e se houver executará a function loginRequest()
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate), // Toda vez que a página for recarregada, persist mandará o type(ação) 'persist/REHYDRATE' para o Redux. takeLatest verificará se no Redux existe algum type(ação) com o msm valor de 'types.PERSIST_REHYDRATE' e se houver executará a function persistRehydrate()
]);
