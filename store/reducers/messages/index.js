import { SET_MESSAGES } from '../../actionCreators/messages';

const defaultState = {
  messages: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_MESSAGES:
      return {
        ...state,
        messages: action.payload.messages
      };

    default:
      return state;
  }
};
