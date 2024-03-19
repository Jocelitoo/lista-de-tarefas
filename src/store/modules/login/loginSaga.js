import { all, takeLatest } from 'redux-saga/effects';
import axios from '../../../services/axios';

import * as types from '../types'; // Importa todos os elementos exportados do arquivo types.js

function persistRehydrate({ payload }) {
  const { token } = payload.LOGIN; // Pega o 'token' do initialState de loginSlice
  if (!token) return; // Se token estiver com algum valor inválido(null,undefined,...) IF terminará a function aqui
  axios.defaults.headers.Authorization = `Bearer ${token}`; // Coloca o token no headers dentro de Authorization
}

export const loginSaga = all([
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate), // Toda vez que a página for recarregada, persist mandará o type(ação) 'persist/REHYDRATE' para o Redux. takeLatest verificará se no Redux existe algum type(ação) com o msm valor de 'types.PERSIST_REHYDRATE' e se houver executará a function persistRehydrate()
]);
