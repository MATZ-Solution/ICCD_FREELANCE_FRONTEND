// store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // uses localStorage
import { combineReducers } from 'redux';
import userReducer from './slices/userSlice'; // adjust path
import gigsReducer from './slices/gigsDetailSlice'

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  gigs: gigsReducer
  // add other reducers here
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

export const persistor = persistStore(store);
