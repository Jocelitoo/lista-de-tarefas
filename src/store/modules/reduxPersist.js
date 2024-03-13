import storage from 'redux-persist/lib/storage'; // Por padrão, vai salvar os dado no localstorage do navegador
import { persistReducer } from 'redux-persist';
import { loginSlice } from './login/loginSlices';

export default (reducers) => {
  const persistedReducers = persistReducer(
    {
      key: 'CONSUMO-API',
      storage,
      whitelist: [`${loginSlice.name}`], // Nome dos reducers que precisam ter os dados do initialState salvos no localStorage
    },
    reducers
  );

  return persistedReducers;
};
