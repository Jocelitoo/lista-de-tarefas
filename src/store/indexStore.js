import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';

import { rootSaga } from './modules/rootSaga';
import { rootReducer } from './modules/rootSlices';
import persistedReducer from './modules/reduxPersist';

const sagaMidleware = createSagaMiddleware();

export const store = configureStore({
  reducer: persistedReducer(rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(sagaMidleware),
});

sagaMidleware.run(rootSaga);

export const persistor = persistStore(store);
