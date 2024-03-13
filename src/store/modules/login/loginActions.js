import {
  LOGIN_REQUEST,
  LOGIN_SUCESS,
  LOGIN_FAILURE,
  EDIT_SUCESS,
} from '../types';

// Responsável por mandar o type(ação) para o Reducer
export function loginRequest(payload) {
  return {
    type: LOGIN_REQUEST,
    payload, // Objeto com os dados enviados na ação
  };
}

// Responsável por mandar o type(ação) para o Reducer
export function loginSucess(payload) {
  return {
    type: LOGIN_SUCESS,
    payload, // Objeto com os dados enviados na ação
  };
}

// Responsável por mandar o type(ação) para o Reducer
export function loginFailure(payload) {
  return {
    type: LOGIN_FAILURE,
    payload, // Objeto com os dados enviados na ação
  };
}

export function editSucess(payload) {
  return {
    type: EDIT_SUCESS,
    payload, // Objeto com os dados enviados na ação
  };
}
