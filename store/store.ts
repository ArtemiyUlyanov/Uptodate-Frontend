import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import { persistReducer, persistStore, WebStorage } from 'redux-persist';

const storage: WebStorage = {
  getItem: (key) => Promise.resolve(localStorage.getItem(key) || null),
  setItem: (key, value) => Promise.resolve(localStorage.setItem(key, value)),
  removeItem: (key) => Promise.resolve(localStorage.removeItem(key)),
};

const persistConfig = {
  key: 'root',
  storage,
};

export const store = configureStore({
    reducer: {
      auth: persistReducer(persistConfig, authReducer),
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false
      })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;