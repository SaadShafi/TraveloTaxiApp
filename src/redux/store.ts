import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { PersistConfig } from 'redux-persist/es/types';
import { mmkvPersistStorage } from './mmkvAdaptar';
import authReducer from './slice/authSlice';
import roleReducer from './slice/roleSlice';
import screenReducer from './slice/screenSlice';

export interface RootState {
  role: ReturnType<typeof roleReducer>;
  screen: ReturnType<typeof screenReducer>;
  auth: ReturnType<typeof authReducer>;
}

const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage: mmkvPersistStorage,
  whitelist: ['auth', 'role'],
};

const rootReducer = combineReducers({
  role: roleReducer,
  screen: screenReducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
