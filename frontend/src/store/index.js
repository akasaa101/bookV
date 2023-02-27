import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger'
import reducer from './reducer';
import { routerMiddleware } from 'react-router-redux'
import { createBrowserHistory } from 'history';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const history = createBrowserHistory();

// Build the middleware for intercepting and dispatching navigation actions
const myRouterMiddleware = routerMiddleware(history);

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['token'] // specify any reducer that you want to persist
};

const persistedReducer = persistReducer(persistConfig, reducer);

const middleware = [...getDefaultMiddleware(), myRouterMiddleware];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

export const store = configureStore({
  reducer: persistedReducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production'
});

export const persistor = persistStore(store);