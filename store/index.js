import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import createReducer from './reducers';

const initStore = () => {
  const store = createStore(
    createReducer(),
    composeWithDevTools(
      applyMiddleware(ReduxThunk)
    )
  );

  store.asyncReducers = {};

  return store;
};

const initInjectAsyncReducer = (store) => {
  return (asyncReducers) => {
    Object.keys(asyncReducers).map((key) => store.asyncReducers[key] = asyncReducers[key]);

    store.replaceReducer(createReducer(store.asyncReducers));
  };
};

const store = initStore();

export const injectAsyncReducer = initInjectAsyncReducer(store);

export default store;
