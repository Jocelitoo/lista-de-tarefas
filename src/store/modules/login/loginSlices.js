/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';
import axios from '../../../services/axios';

export const initialState = {
  isLoggedIn: false,
  token: false,
  user: {},
  isLoading: false,
};

// Funciona semelhante a um IF(), se algum dos reducers tiver o mesmo nome do type(ação) disparado pro redux, então o código desse reducer será executado --> if(reducer === type){...}
export const loginSlice = createSlice({
  name: 'LOGIN',
  initialState,
  reducers: {
    // Se a type(ação) de nome 'LOGIN/REQUEST' for disparada pro redux, executa o código abaixo --> if('click/request' === type){...}
    REQUEST: (state = initialState, action = '') => {
      const newState = { ...state };
      newState.isLoading = true;
      return newState;
    },

    // Se a type(ação) de nome 'LOGIN/SUCESS' for disparada pro redux, executa o código abaixo --> if('click/sucess' === type){...}
    SUCESS: (state = initialState, action = '') => {
      console.log('Sucess', action.payload);
      const newState = { ...state };
      newState.isLoggedIn = true;
      newState.token = action.payload.token;
      newState.user = action.payload.user;
      newState.isLoading = false;
      return newState;
    },

    // Se a type(ação) de nome 'LOGIN/FAILURE' for disparada pro redux, executa o código abaixo --> if('click/failure' === type){...}
    FAILURE: (state = initialState) => {
      delete axios.defaults.headers.Authorization;
      console.log('Failure');
      const newState = { ...state };
      newState.isLoggedIn = false;
      newState.token = false;
      newState.user = {};
      newState.isLoading = false;
      return newState;
    },

    // Se a type(ação) de nome 'LOGIN/EDIT_SUCESS' for disparada pro redux, executa o código abaixo --> if('click/sucess' === type){...}
    EDIT_SUCESS: (state = initialState, action = '') => {
      const newState = { ...state };
      newState.user = action.payload;
      newState.isLoading = false;
      return newState;
    },
  },
});
