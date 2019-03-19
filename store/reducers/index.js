import { combineReducers } from 'redux';

import messages from './messages';

export default (asyncReducers = {}) => {
  return combineReducers({
    messages,
    ...asyncReducers
  });
};
