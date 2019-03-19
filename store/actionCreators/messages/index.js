export const SET_MESSAGES = 'SET_MESSAGES';

export const messagesSelector = (state) => state.messages;

export const messagesChange = (messages) => {
  return {
    type: SET_MESSAGES,
    payload: { messages }
  };
};
