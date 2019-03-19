import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from '../store';

import Home from '../components/Home';

const App = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  )
}
export default App;
